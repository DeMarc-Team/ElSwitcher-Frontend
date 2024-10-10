import React, { useEffect, useState } from "react";
import { ObtenerTablero } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { usePartida } from "@/context/PartidaContext";
import {
    JugarCartaMovimiento,
    Casilla,
} from "@/services/api/jugar_carta_movimiento";
import { ResaltarCasillasMovimientos } from "@/services/api/resaltar_casillas_movimientos";

const COLORES: string[] = [
    "red", // 0
    "green", // 1
    "blue", // 2
    "yellow", // 3
];

interface DashboardProps {
    id_partida: number;
}

const Board: React.FC<DashboardProps> = ({ id_partida }) => {
    const [tablero, setTablero] = useState<number[][]>([]);
    const [casillasMovimientos, SetCasillasMovimientos] = useState<Casilla[]>(
        []
    );
    const { turno_actual, jugador } = usePartida();
    const { triggeractualizarTablero } = useInsidePartidaWebSocket();
    const {
        primeraSeleccion,
        setPrimeraSeleccion,
        segundaSeleccion,
        setSegundaSeleccion,
        cartaSeleccionada,
        setCartaSeleccionada,
        codigoCartaMovimiento,
        setPasarTurno,
    } = useMovimientoContext();

    useEffect(() => {
        fetchTablero(); // Se ejecuta solo cuando el componente se monta
    }, []);

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    const fetchResaltarCasillas = async (row: number, col: number) => {
        try {
            if (
                jugador?.id !== undefined &&
                //primeraSeleccion !== null &&  FIXME: primeraSelecion debería estar cargado pero no lo está.
                codigoCartaMovimiento !== null
            ) {
                const data = await ResaltarCasillasMovimientos(
                    id_partida,
                    jugador?.id,
                    { row: row, col: col },
                    codigoCartaMovimiento
                );
                SetCasillasMovimientos(data);
                console.log("Casillas Movimientos:", data); // Agrega esta línea
            }
        } catch (error) {
            console.error("Error al obtener las casillas:", error);
        }
    };

    const enviarMovimiento = async (casilla1: Casilla, casilla2: Casilla) => {
        if (cartaSeleccionada !== null && jugador?.id === turno_actual?.id) {
            if (codigoCartaMovimiento && jugador?.id) {
                try {
                    const response = await JugarCartaMovimiento(
                        casilla1,
                        casilla2,
                        codigoCartaMovimiento,
                        id_partida,
                        jugador?.id
                    );
                    console.log("Movimiento enviado:", response);
                } catch (error) {
                    console.error("Error al enviar el movimiento:", error);
                }
            } else {
                console.log(
                    "No se ha seleccionado un código de carta de movimiento."
                );
            }
        } else {
            console.log(
                "No es el turno del jugador o no hay carta seleccionada."
            );
        }
    };

    const handleButtonClick = (row: number, col: number) => {
        console.log("Clicked cell:", { row, col }); // Para verificar qué celda se ha hecho clic
        if (!primeraSeleccion) {
            console.log("Setting primeraSeleccion:", { row, col });
            setPrimeraSeleccion({ row, col }); //FIXME: No se está seteando inmediatamente, luego de tocar la segunda ficha, recién ahí se setea.
            setPasarTurno(false);
            fetchResaltarCasillas(row, col);
        } else if (primeraSeleccion && !segundaSeleccion) {
            console.log("Setting segundaSeleccion:", { row, col });
            setSegundaSeleccion({ row, col });
            enviarMovimiento(
                { row: primeraSeleccion.row, col: primeraSeleccion.col },
                { row, col }
            ).then(() => {
                // Restablece las selecciones después de enviar el movimiento
                setPrimeraSeleccion(null);
                setSegundaSeleccion(null);
            });
            setPasarTurno(true);
        } else {
            console.log("Ya has seleccionado ambas celdas.");
        }
    };

    useEffect(() => {
        fetchTablero();
        setCartaSeleccionada(null);
        SetCasillasMovimientos([]);
    }, [triggeractualizarTablero]);

    // Función para verificar si la casilla está en "casillasMovimientos"
    const esCasillaResaltada = (row: number, col: number) => {
        return casillasMovimientos.some(
            (casilla) => casilla.row === row && casilla.col === col
        );
    };

    return (
        <div className="flex h-fit w-[388px] items-center justify-center">
            <div className="grid grid-cols-6 grid-rows-6 gap-1 rounded-lg border-4 border-black bg-yellow-100 p-2 shadow-2xl">
                {tablero.map((row: any[], rowIndex: number) =>
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-lg border-2 border-black shadow-lg hover:scale-110",
                                `bg-${COLORES[cell - 1]}-400`,
                                {
                                    "cursor-not-allowed":
                                        cartaSeleccionada === null ||
                                        turno_actual?.id !== jugador?.id, // Deshabilitar si no es el turno del jugador
                                },
                                // Resaltar las casillas seleccionadas
                                {
                                    "border-indigo-500 bg-opacity-50":
                                        (primeraSeleccion &&
                                            primeraSeleccion.row === rowIndex &&
                                            primeraSeleccion.col ===
                                                colIndex) ||
                                        (segundaSeleccion &&
                                            segundaSeleccion.row === rowIndex &&
                                            segundaSeleccion.col === colIndex),
                                },
                                {
                                    "border-indigo-500 bg-opacity-50":
                                        esCasillaResaltada(rowIndex, colIndex),
                                }
                            )}
                            onClick={() =>
                                handleButtonClick(rowIndex, colIndex)
                            }
                            // Deshabilitar el botón si no es el turno o no hay carta seleccionada
                            disabled={
                                cartaSeleccionada === null ||
                                turno_actual?.id !== jugador?.id ||
                                (primeraSeleccion !== null &&
                                    !esCasillaResaltada(rowIndex, colIndex))
                            }
                        ></button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;
