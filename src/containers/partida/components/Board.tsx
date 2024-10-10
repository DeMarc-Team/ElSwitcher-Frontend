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
import { ResaltarCasillasMovimientos } from "@/containers/partida/components/ResalatarCasillasMovimientos";
import { esTurnoDelJugador } from "@/containers/partida/components/EsTurnoDelJugador";

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
        rotVec,
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

    const resaltarCasillas = (row: number, col: number) => {
        if (rotVec && codigoCartaMovimiento) {
            const casillasMove = ResaltarCasillasMovimientos(
                row,
                col,
                rotVec,
                codigoCartaMovimiento
            );
            SetCasillasMovimientos(casillasMove);
        }
    };

    const enviarMovimiento = async (casilla1: Casilla, casilla2: Casilla) => {
        if (esTurnoDelJugador(cartaSeleccionada, turno_actual, jugador)) {
            if (codigoCartaMovimiento && jugador?.id) {
                try {
                    const response = await JugarCartaMovimiento(
                        casilla1,
                        casilla2,
                        codigoCartaMovimiento,
                        id_partida,
                        jugador.id
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
        console.log("Clicked cell:", { row, col });
        if (!primeraSeleccion) {
            setPrimeraSeleccion({ row, col });
            setPasarTurno(false);
            resaltarCasillas(row, col);
        } else if (primeraSeleccion && !segundaSeleccion) {
            setSegundaSeleccion({ row, col });
            enviarMovimiento(
                { row: primeraSeleccion.row, col: primeraSeleccion.col },
                { row, col }
            ).then(() => {
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
        setCartaSeleccionada(undefined);
        SetCasillasMovimientos([]);
    }, [triggeractualizarTablero]);

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
                                        turno_actual?.id !== jugador?.id,
                                },
                                {
                                    "border-indigo-500 bg-opacity-50":
                                        segundaSeleccion &&
                                        segundaSeleccion.row === rowIndex &&
                                        segundaSeleccion.col === colIndex,
                                },
                                {
                                    "border-indigo-500 bg-opacity-50":
                                        esCasillaResaltada(rowIndex, colIndex),
                                }
                            )}
                            onClick={() =>
                                handleButtonClick(rowIndex, colIndex)
                            }
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
