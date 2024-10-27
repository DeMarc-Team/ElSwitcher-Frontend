import React, { useEffect, useState } from "react";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import Celda from "@/containers/partida/components/Celda";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";
import { useFuncionesSeleccion } from "./funciones_seleccion";
import useFetchTablero from "./use_fetch_tablero";
interface DashboardProps {
    id_partida: number;
}

const Board: React.FC<DashboardProps> = ({ id_partida }) => {
    const { tablero, figuras, fetchTablero } = useFetchTablero(id_partida);
    const { triggeractualizarTablero } = useInsidePartidaWebSocket();
    const {
        primeraSeleccion,
        cartaMovimientoSeleccionada,
        setCartaMovimientoSeleccionada,
        setCasillasMovimientos,
    } = useMovimientoContext();
    const { codigoCartaFigura, setExisteFigura } = useFiguraContext();
    const {
        manejarSeleccionFigura,
        mostrarMensajeSinSeleccion,
        esCasillaResaltada,
        estaDeshabilitado,
        esParteDeFigura,
        figuraElegida,
        manejarSeleccionMovimiento,
    } = useFuncionesSeleccion(figuras);
    const [animar, setAnimar] = useState(true);

    const manejarSeleccionClick = (row: number, col: number, cell: number) => {
        // Verificar si hay una carta seleccionada
        if (
            cartaMovimientoSeleccionada !== undefined ||
            codigoCartaFigura !== undefined
        ) {
            if (cartaMovimientoSeleccionada !== undefined) {
                manejarSeleccionMovimiento(row, col);
            } else {
                manejarSeleccionFigura(row, col, cell);
            }
        } else {
            mostrarMensajeSinSeleccion();
        }
    };

    // Actualizar tablero cuando se detecte un cambio en el WebSocket
    useEffect(() => {
        fetchTablero();
        setCartaMovimientoSeleccionada(undefined);
        setCasillasMovimientos([]);
        setExisteFigura([]);
        setAnimar(false);
        setTimeout(() => setAnimar(true), 500);
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
                            animar={animar}
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
