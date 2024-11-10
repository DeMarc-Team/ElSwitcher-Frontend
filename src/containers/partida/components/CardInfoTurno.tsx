import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ObtenerInfoTurno } from "@/services/api/obtener_info_turno";
import { useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { Cronometro } from "./Cronometro";

export default function CardInfoDelTurno() {
    const { jugador, partida, turno_actual, setTurnoActual } = usePartida();
    const { triggerActualizarTurno } = useInsidePartidaWebSocket();
    const { showToastError } = useNotification();

    useEffect(() => {
        fecthInfoTurno();
    }, [triggerActualizarTurno]);

    const fecthInfoTurno = async () => {
        if (!partida) {
            return;
        }
        try {
            const infoTurno = await ObtenerInfoTurno(partida.id);
            setTurnoActual({
                id: infoTurno.id_jugador,
                nombre: infoTurno.nombre_jugador,
            });
        } catch (error) {
            showToastError("Error al obtener la información del turno");
        }
    };

    if (!turno_actual || !jugador || !partida) {
        return <div>Cargando...</div>;
    }
    return (
        <Card className="h-fit w-full border-2 border-black bg-yellow-100 px-1 py-4">
            <CardContent className="flex flex-row items-center justify-center gap-6 p-0 max-lg:px-2">
                <div>
                    {" "}
                    <CardTitle className="max-lg:text-sm">TURNO DE</CardTitle>
                    <CardDescription className="text-center text-base max-lg:text-sm">
                        {turno_actual.id == jugador.id ? (
                            <span>Es tú turno !!</span>
                        ) : (
                            <span>Otro jugador</span>
                        )}
                    </CardDescription>
                </div>
                <div className="flex flex-col gap-1">
                    <div
                        className={`flex h-16 w-40 items-center justify-center rounded-md border-2 border-dashed border-black text-center ${turno_actual.id == jugador.id ? "bg-green-400" : ""}`}
                    >
                        <p
                            className={`break-words p-1 text-center font-bold ${turno_actual.nombre.length > 30 ? "!break-all text-sm" : "text-xl"}`}
                        >
                            {turno_actual.nombre}
                        </p>
                    </div>
                    <Cronometro id_partida={partida.id} />
                </div>
            </CardContent>
        </Card>
    );
}
