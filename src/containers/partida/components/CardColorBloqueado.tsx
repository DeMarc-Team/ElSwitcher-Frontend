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
        triggerColorProhibido,
        triggerActualizarCartasFigura,
        triggerActualizarTurno,
    } = useInsidePartidaWebSocket();

    //Polling hasta que esté el endpoint
    useEffect(() => {
        fetchColorBloqueado();
    }, [triggerActualizarCartasFigura, triggerActualizarTurno]);

    const fetchColorBloqueado = async () => {
        try {
            setColorBloqueado(await ObtenerColorBloqueado(id_partida));
        } catch (error) {
            console.error(error);
        }
    };

    console.log("El color bloqueado es", colorBloqueado);
    return (
        <Card className="flex h-14 w-64 border-2 border-black bg-yellow-100 p-2">
            <CardContent className="m-1 flex flex-row items-center justify-center p-0">
                <CardTitle className="m-1 text-base">COLOR BLOQUEADO</CardTitle>
                <div
                    className={`flex h-8 w-16 rounded-lg border-2 border-dashed border-black ${
                        colorBloqueado !== null &&
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
