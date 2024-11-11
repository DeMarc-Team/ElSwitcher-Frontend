import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { ObtenerColorBloqueado } from "@/services/api/obtener_color_bloqueado";
import { useEffect } from "react";

const COLORES: string[] = ["red", "green", "blue", "yellow"];

type CardColorBloqueadoProps = {
    id_partida: number;
};

export default function CardColorBloqueado({
    id_partida,
}: CardColorBloqueadoProps) {
    const { colorBloqueado, setColorBloqueado } = usePartida();

    const {
        triggerActualizarCartasFigura,
        // Se usa esto porque el único momento en el que se cambia el
        //color prohibido es al usar una cartas de figura propia o para bloquear
    } = useInsidePartidaWebSocket();

    useEffect(() => {
        fetchColorBloqueado();
    }, [triggerActualizarCartasFigura]);

    const fetchColorBloqueado = async () => {
        try {
            const colorRecibido = await ObtenerColorBloqueado(id_partida);

            if (Number.isInteger(colorRecibido.color)) {
                setColorBloqueado(colorRecibido.color);
            } else {
                console.error(
                    "Color bloqueado no válido, debe ser un entero:",
                    colorRecibido.color
                );
                setColorBloqueado(undefined);
            }
        } catch (error) {
            console.error("Error al obtener el color bloqueado:", error);
            setColorBloqueado(undefined);
        }
    };

    return (
        <Card className="h-fit w-[330px] border-2 border-black bg-yellow-100 p-1">
            <CardContent className="flex flex-row items-center justify-between gap-4 p-0">
                <CardTitle className="text-nowrap text-base">
                    COLOR BLOQUEADO
                </CardTitle>
                <div
                    className={`h-5 w-full rounded border-2 border-dashed border-black ${
                        colorBloqueado !== undefined &&
                        colorBloqueado >= 0 &&
                        colorBloqueado <= 3
                            ? `bg-${COLORES[colorBloqueado]}-400`
                            : "bg-yellow-100"
                    }`}
                ></div>
            </CardContent>
        </Card>
    );
}
