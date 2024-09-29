import React, { useEffect, useState } from "react";
import { ObtenerTablero } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";

const COLORES: string[] = [
    "red", // 0
    "green", // 1
    "blue", // 2
    "yellow", // 3
];

interface DashboardProps {
    id_partida: number; // Cambia el tipo según lo que necesites (puede ser string o number)
}

const Board: React.FC<DashboardProps> = ({ id_partida }) => {
    const [tablero, setTablero] = useState<number[][]>([]); // Asegúrate de que el tipo coincida con lo que esperas

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    useEffect(() => {
        fetchTablero();
    }, [id_partida]);

    return (
        <div className="flex h-fit w-[388px] items-center justify-center">
            <div className="grid grid-cols-6 grid-rows-6 gap-1 rounded-lg border-8 border-black bg-yellow-100 p-2 shadow-2xl">
                {tablero.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={cn(
                                "flex h-14 w-14 items-center justify-center rounded-lg border-4 border-black bg-blue-400 shadow-lg",
                                `bg-${COLORES[cell]}-400`
                            )}
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;
