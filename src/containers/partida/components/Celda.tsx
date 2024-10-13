import React from "react";
import { cn } from "@/services/shadcn_lib/utils";

const COLORES: string[] = ["red", "green", "blue", "yellow"];

interface CeldaProps {
    rowIndex: number;
    colIndex: number;
    cell: number;
    primeraSeleccion: { row: number; col: number } | null;
    handleClick: (rowIndex: number, colIndex: number) => void;
    esResaltada: (rowIndex: number, colIndex: number) => boolean;
    esParteDeFigura: (rowIndex: number, colIndex: number) => boolean;
    estaDeshabilitado: () => boolean;
    destacarFigura: (rowIndex: number, colIndex: number) => boolean;
}

const Celda: React.FC<CeldaProps> = ({
    rowIndex,
    colIndex,
    cell,
    primeraSeleccion,
    handleClick,
    esResaltada,
    estaDeshabilitado,
    esParteDeFigura,
    destacarFigura,
}) => (
    <button
        className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg border-2 border-black shadow-lg hover:scale-110",
            `bg-${COLORES[cell - 1]}-400`,
            {
                "cursor-not-allowed": estaDeshabilitado(),
            },
            {
                "scale-110 border-[3px] saturate-150":
                    primeraSeleccion &&
                    primeraSeleccion.row === rowIndex &&
                    primeraSeleccion.col === colIndex,
            },
            {
                "animate-bounce-loop border-[3px] border-dashed saturate-150 hover:animate-none":
                    esResaltada(rowIndex, colIndex),
            },
            {
                "border-4 border-blue-600": esParteDeFigura(rowIndex, colIndex),
            },
            {
                "border-4 border-red-600": destacarFigura(rowIndex, colIndex),
            }
        )}
        onClick={() => handleClick(rowIndex, colIndex)}
        disabled={estaDeshabilitado()}
    ></button>
);

export default Celda;
