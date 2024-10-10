import React, { useEffect, useState } from "react";
import { ObtenerTablero, Figura } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";

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
    const [figuras, setFiguras] = useState<Figura[]>([]);

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
            setFiguras(data.figuras);
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    useEffect(() => {
        fetchTablero();
    }, [id_partida]);

    function handleRenderCell(
        cell: number,
        rowIndex: number,
        colIndex: number
    ) {
        let esParteDeFigura = false;
        // Verificar si la celda es parte de alguna figura
        figuras.some((figura) => {
            figura.casillas.some((casilla) => {
                if (casilla.row === rowIndex && casilla.column === colIndex) {
                    esParteDeFigura = true;
                }
            });
        });

        return (
            <button
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400 shadow-lg hover:scale-110 hover:border-indigo-500",
                    `bg-${COLORES[cell - 1]}-400`,
                    esParteDeFigura
                        ? "border-4 border-blue-600"
                        : "border-2 border-black"
                )}
            ></button>
        );
    }

    return (
        <div className="flex h-fit w-[388px] items-center justify-center">
            <div className="grid grid-cols-6 grid-rows-6 gap-1 rounded-lg border-4 border-black bg-yellow-100 p-2 shadow-2xl">
                {tablero.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        handleRenderCell(cell, rowIndex, colIndex)
                    )
                )}
            </div>
        </div>
    );
};

export default Board;
