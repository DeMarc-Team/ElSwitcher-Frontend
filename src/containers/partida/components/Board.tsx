import React, { useEffect, useState } from "react";
import { ObtenerTablero } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";

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
    const { primeraSeleccion, setPrimeraSeleccion, segundaSeleccion, setSegundaSeleccion,cartaSeleccionada } = useMovimientoContext(); 

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    const handleButtonClick = (row: number, col: number) => {
        if (!primeraSeleccion) {
            setPrimeraSeleccion({ row, col });
        } else if (!segundaSeleccion) {
            setSegundaSeleccion({ row, col });
        }
        //ESTO VA A CONDICIONAR EL COMPORTAMIENTO
        // Se debe de elegir primero una carta antes que las fichas
        else if (!cartaSeleccionada){ 

        }
    };

    useEffect(() => {
        fetchTablero();
    }, [id_partida]);

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
                            { 'cursor-not-allowed': !cartaSeleccionada }, // Estilo si no hay carta seleccionada
                            //Comportamiento de las dos fichas que voy a mover
                            { 'border-red-700': (primeraSeleccion && primeraSeleccion.row === rowIndex && primeraSeleccion.col === colIndex )
                                || (segundaSeleccion && segundaSeleccion.row === rowIndex && segundaSeleccion.col === colIndex)
                            }
                        )}
                        onClick={() => handleButtonClick(rowIndex, colIndex)}
                        disabled={!cartaSeleccionada} // Deshabilitar el tablero
                    ></button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;
