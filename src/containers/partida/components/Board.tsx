import React, { useEffect, useState } from "react";
import { ObtenerTablero, Figura } from "../../../services/api/ver_tablero";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { usePartida } from "@/context/PartidaContext";
import {
    JugarCartaMovimiento,
    Casilla,
} from "@/services/api/jugar_carta_movimiento";
import { ResaltarCasillasMovimientos } from "@/containers/partida/components/resalatar_casillas_movimientos";
import { esTurnoDelJugador } from "@/containers/partida/components/es_turno_del_jugador";
import {
    manejarSeleccion,
    reiniciarSeleccion,
} from "@/containers/partida/components/manejar_seleccion";
import Celda from "@/containers/partida/components/Celda";
import { useNotification } from "@/hooks/useNotification";
import { useFiguraContext } from "@/context/FigurasContext";
import { JugarCartaFigura } from "@/services/api/jugar_carta_figura";

interface DashboardProps {
    id_partida: number;
}

const Board: React.FC<DashboardProps> = ({ id_partida }) => {
    const [tablero, setTablero] = useState<number[][]>([]);
    const [figuras, setFiguras] = useState<Figura[]>([]);
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
        casillasMovimientos,
        setCasillasMovimientos,
    } = useMovimientoContext();
    const { showToastError, showToastInfo, closeToast } = useNotification();
    const {
        cartaFSeleccionada,
        setExisteFigura,
        figuraSeleccionada,
        setFiguraSeleccionada,
    } = useFiguraContext();

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
            setFiguras(data.figuras);
            //Esto es para poder determinar que cartas de figuras puedo usar
            if (data.figuras) {
                let quefiguras: string[] = [];
                for (const element of data.figuras) {
                   if (element.casillas.length > 0) {
                        quefiguras.push(element.nombre);
                   }
                }
                setExisteFigura(quefiguras);
            }
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    // Resaltar casillas para los movimientos
    const resaltarCasillas = (row: number, col: number) => {
        if (rotVec && codigoCartaMovimiento) {
            const casillasMove = ResaltarCasillasMovimientos(
                row,
                col,
                rotVec,
                codigoCartaMovimiento
            );
            setCasillasMovimientos(casillasMove);
        }
    };

    // Enviar movimiento al backend
    const enviarMovimiento = async (casilla1: Casilla, casilla2: Casilla) => {
        if (esTurnoDelJugador(cartaSeleccionada, turno_actual, jugador)) {
            if (codigoCartaMovimiento && jugador?.id) {
                try {
                    const response = await JugarCartaMovimiento(
                        casilla1,
                        casilla2,
                        id_partida,
                        jugador.id,
                        codigoCartaMovimiento
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

    const manejarSeleccionClick = (row: number, col: number) => {
        // Verificar si hay una carta seleccionada
        if (cartaFSeleccionada !== undefined || cartaFSeleccionada !== null) {
            // Si existe una carta seleccionada
            if (cartaSeleccionada !== undefined) {
                // Manejar la lógica de selección de carta normal
                manejarSeleccion(
                    row,
                    col,
                    primeraSeleccion,
                    setPrimeraSeleccion,
                    segundaSeleccion,
                    setSegundaSeleccion,
                    setPasarTurno,
                    esCasillaResaltada,
                    resaltarCasillas,
                    enviarMovimiento,
                    () =>
                        reiniciarSeleccion(
                            setPrimeraSeleccion,
                            setSegundaSeleccion,
                            setCartaSeleccionada,
                            setCasillasMovimientos
                        )
                );
            }
            // Si hay una figura seleccionada
            else if (cartaFSeleccionada !== null) {
                const figura = figuras.find((f) =>
                    f.casillas.some(
                        (casilla) =>
                            casilla.row === row && casilla.column === col
                    )
                );
                if (figura && figura.nombre === cartaFSeleccionada) {
                    // Si la figura coincide, seleccionar la figura
                    setFiguraSeleccionada(figura);
                    //ACÁ MANEJAR EL LLAMADO A LA API PARA LAS FIGURAS
                    if (jugador != undefined) {
                        JugarCartaFigura(figura.casillas, id_partida, jugador.id, figura.nombre)
                            .then((response) => {
                                // Si la API responde correctamente
                                if (response.cartaJugada) {
                                    console.log("Carta jugada exitosamente");
                                    setFiguraSeleccionada(null); //Cuidado
                                }
                            })
                            .catch((error) => {
                                // Manejar el error si ocurre
                                console.error("Error al jugar la carta de figura:", error);
                            })
                    }
                } else {
                    // Si la figura no coincide, mostrar error
                    setFiguraSeleccionada(null);
                    showToastError("No se puede hacer esa jugada");

                    // Cerrar el toast de error después de 2 segundos
                    setTimeout(() => {
                        closeToast();
                    }, 2000);
                }
            }
        } else {
            // Mostrar mensaje de información si no hay carta seleccionada
            showToastInfo("Selecciona primero una carta", true);

            // Cerrar el toast de información después de 2 segundos
            setTimeout(() => {
                closeToast();
            }, 2000);
        }
    };

    // Condición para deshabilitar botones
    const estaDeshabilitado = () => {
        return turno_actual?.id !== jugador?.id;
    };

    // Verificar si una casilla está resaltada
    const esCasillaResaltada = (row: number, col: number) => {
        return casillasMovimientos.some(
            (casilla) => casilla.row === row && casilla.col === col
        );
    };

    // Actualizar tablero cuando se detecte un cambio en el WebSocket
    useEffect(() => {
        fetchTablero();
        setCartaSeleccionada(undefined);
        setCasillasMovimientos([]);
        // setFiguraSeleccionada(null);
    }, [triggeractualizarTablero]);

    function esParteDeFigura(rowIndex: number, colIndex: number) {
        let esParteDeFigura = false;
        // Verificar si la celda es parte de alguna figura
        figuras.some((figura) => {
            figura.casillas.some((casilla) => {
                if (casilla.row === rowIndex && casilla.column === colIndex) {
                    esParteDeFigura = true;
                }
            });
        });

        return esParteDeFigura;
    }

    function figuraElegida(rowIndex: number, colIndex: number): boolean {
        return figuras.some((figura) =>
            figura.casillas.some(
                (casilla) =>
                    casilla.row === rowIndex &&
                    casilla.column === colIndex &&
                    figura === figuraSeleccionada
            )
        );
    }

    return (
        <div className="flex h-fit w-[388px] items-center justify-center">
            <div className="grid grid-cols-6 grid-rows-6 gap-1 rounded-lg border-4 border-black bg-yellow-100 p-2 shadow-2xl">
                {tablero.map((row: number[], rowIndex: number) =>
                    row.map((cell, colIndex) => (
                        <Celda
                            key={`${rowIndex}-${colIndex}`}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            cell={cell}
                            handleClick={manejarSeleccionClick}
                            esResaltada={esCasillaResaltada} // Con respecto a movimiento
                            esParteDeFigura={esParteDeFigura} // Para detectar figuras en el tablero
                            primeraSeleccion={primeraSeleccion}
                            estaDeshabilitado={estaDeshabilitado}
                            destacarFigura={figuraElegida}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;
