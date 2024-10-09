import React, { useEffect, useState } from "react";
import { ObtenerTablero } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { usePartida } from "@/context/PartidaContext";
import {
    JugarcartaMovimiento,
    Casilla,
} from "@/services/api/jugar_carta_movimiento";

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

    const enviarMovimiento = async (casilla1: Casilla, casilla2: Casilla) => {
        if (cartaSeleccionada !== null && jugador?.id === turno_actual?.id) {
            if (codigoCartaMovimiento && jugador?.id) {
                try {
                    const response = await JugarcartaMovimiento(
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
        if (!primeraSeleccion) {
            setPrimeraSeleccion({ row, col });
        } else if (!segundaSeleccion) {
            setSegundaSeleccion({ row, col });
            enviarMovimiento(
                { row: primeraSeleccion.row, col: primeraSeleccion.col },
                { row: row, col: col }
            );
        }
        // Lógica adicional: se debe seleccionar una carta antes de interactuar con las fichas
        else if (cartaSeleccionada === null) {
            console.log("Selecciona una carta primero.");
        }
    };

    useEffect(() => {
        fetchTablero();
        setPrimeraSeleccion(null);
        setSegundaSeleccion(null);
        setCartaSeleccionada(null);
    }, [triggeractualizarTablero]);

    return (
        <div className="flex h-fit w-[388px] items-center justify-center">
            <div className="grid grid-cols-6 grid-rows-6 gap-1 rounded-lg border-4 border-black bg-yellow-100 p-2 shadow-2xl">
                {tablero.map((row, rowIndex) =>
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
                                }
                            )}
                            onClick={() =>
                                handleButtonClick(rowIndex, colIndex)
                            }
                            // Deshabilitar el botón si no es el turno o no hay carta seleccionada
                            disabled={
                                cartaSeleccionada === null ||
                                turno_actual?.id !== jugador?.id
                            }
                        ></button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;
