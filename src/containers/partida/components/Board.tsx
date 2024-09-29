import React, { useEffect, useState } from "react";
import { ObtenerTablero } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";
import click from "@/components/sounds/click-21156.mp3";

const COLORES: string[] = [
    "red", // 0
    "green", // 1
    "blue", // 2
    "yellow", // 3
];

interface DashboardProps {
    id_partida: number; // Cambia el tipo según lo que necesites (puede ser string o number)
}

const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play();
};

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
        <div className="flex h-screen items-center justify-center">
            <div className="grid grid-cols-6 grid-rows-6 gap-1 rounded-lg border-4 border-black bg-yellow-100 p-2 shadow-2xl">
                {tablero.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            onMouseEnter={() => playSound(click)}
                            key={`${rowIndex}-${colIndex}`}
                            className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-lg border-2 border-black bg-blue-400 shadow-lg hover:scale-110 hover:border-indigo-500",
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
