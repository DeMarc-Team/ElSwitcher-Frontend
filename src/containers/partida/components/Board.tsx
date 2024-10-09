import React, { useEffect, useState } from "react";
import { ObtenerTablero,Figura } from "../../../services/api/ver_tablero";
import { cn } from "@/services/shadcn_lib/utils";
import { useFiguraContext } from "../../../context/FigurasContext";
import { useNotification } from "@/hooks/useNotification";

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
    const [figuraSeleccionada, setFiguraSeleccionada] = useState<Figura | null>(null);
    const { cartaFSeleccionada,setExisteFigura } = useFiguraContext();

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
            setFiguras(data.figuras);
            if(data.figuras){
                let quefiguras : string [] = []
                for (const element of figuras) {
                    quefiguras.push(element.nombre)
                }
                setExisteFigura(quefiguras)
            }
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    useEffect(() => {
        fetchTablero();
    }, [id_partida]);

    // Función para seleccionar una figura basada en la casilla seleccionada
    function seleccionarFigura(rowIndex: number, colIndex: number) {
        const { showToastError, closeToast } = useNotification();
        const figura = figuras.find((f) =>
            f.casillas.some((casilla) => casilla.row === rowIndex && casilla.column === colIndex)
        );
        
        if (figura && figura.nombre === cartaFSeleccionada) {
            setFiguraSeleccionada(figura); 
            //Acá debería de tirar la carta de la mano 
            console.log("Jugada hecha")
        }
        else{
            showToastError("Se debe seleccionar una figura")
            setFiguraSeleccionada(null); 
        }
    }

    // Función para renderizar las celdas del tablero
    function handleRenderCell(cell: number, rowIndex: number, colIndex: number) {
        let esParteDeFigura = false;
        let esParteDeFiguraSeleccionada = false;

        figuras.forEach((figura) => {
            figura.casillas.forEach((casilla) => {
                if (casilla.row === rowIndex && casilla.column === colIndex) {
                    esParteDeFigura = true;
                    // Verificar si la celda pertenece a la figura seleccionada
                    if (figura === figuraSeleccionada) {
                        esParteDeFiguraSeleccionada = true;
                    }
                }
            });
        });
        return (
            <button
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400 shadow-lg hover:scale-110 hover:border-indigo-500",
                    `bg-${COLORES[cell - 1]}-400`,
                    esParteDeFiguraSeleccionada
                        ? "border-4 border-red-600"
                        : esParteDeFigura
                        ? "border-4 border-blue-600"
                        : "border-2 border-black",
                    cartaFSeleccionada ? "" : "cursor-not-allowed"
                )}
                disabled={!cartaFSeleccionada}
                onClick={() => seleccionarFigura(rowIndex,colIndex)}
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
