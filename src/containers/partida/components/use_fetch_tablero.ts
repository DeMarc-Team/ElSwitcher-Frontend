import { useState } from "react";
import { ObtenerTablero, Figura } from "@/services/api/ver_tablero";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";

const useFetchTablero = (id_partida: number) => {
    const [tablero, setTablero] = useState<number[][]>([]);
    const [figuras, setFiguras] = useState<Figura[]>([]);
    const { setExisteFigura } = useFiguraContext();

    const fetchTablero = async () => {
        try {
            const data = await ObtenerTablero(id_partida);
            setTablero(data.tablero6x6);
            setFiguras(data.figuras);
            if (data.figuras) {
                const quefiguras: string[] = data.figuras
                    .filter((element) => element.casillas.length > 0)
                    .map((element) => element.nombre);
                setExisteFigura(quefiguras);
            }
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    return { tablero, figuras, fetchTablero };
};

export default useFetchTablero;
