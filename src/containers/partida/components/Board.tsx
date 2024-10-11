import React, { useEffect, useState } from "react";
import { ObtenerTablero } from "../../../services/api/ver_tablero";
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
        setPasarTurno,
        rotVec,
        casillasMovimientos,
        setCasillasMovimientos,
    } = useMovimientoContext();
    const { showToastInfo, closeToast } = useNotification();

    useEffect(() => {
        fetchTablero(); // Se ejecuta cuando el componente se monta
    }, []);

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
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

    const manejarSeleccionClick = (row: number, col: number) => {
        if (cartaSeleccionada !== undefined) {
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
        } else {
            showToastInfo("Selecciona primero una carta de movimiento.", true);
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
    }, [triggeractualizarTablero]);

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
                            handleClick={manejarSeleccionClick} // Cambia aquí
                            esResaltada={esCasillaResaltada}
                            primeraSeleccion={primeraSeleccion}
                            estaDeshabilitado={estaDeshabilitado}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;
