import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ObtenerInfoTurno } from "@/services/api/obtener_info_turno";
import { useEffect, useState } from "react";
import { useNotification } from "@/hooks/useNotification";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";

export default function CardInfoDelTurno() {
    const { jugador, partida } = usePartida();
    const { setTurnoActual, turno_actual } = usePartida();
    const { triggerActualizarTurno } = useInsidePartidaWebSocket();
    const { showToastError } = useNotification();
    const [es_mi_turno, setEsMiTurno] = useState(false);

    useEffect(() => {
        fecthInfoTurno();
        if (turno_actual && jugador) {
            setEsMiTurno(turno_actual.id === jugador.id);
        }
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

    if (!turno_actual || !jugador) {
        return <div>Cargando...</div>;
    }
    return (
        <Card className="h-fit w-fit border-2 border-black bg-yellow-100 p-4">
            <CardContent className="flex flex-row items-center justify-center gap-6 p-0">
                <div>
                    {" "}
                    <CardTitle>TURNO DE</CardTitle>
                    <CardDescription className="text-center text-base">
                        {es_mi_turno ? (
                            <span>Es tú turno !!</span>
                        ) : (
                            <span>Otro jugador</span>
                        )}
                    </CardDescription>
                </div>
                <div
                    className={`flex h-24 w-40 items-center justify-center rounded-md border-2 border-dashed border-black text-center ${es_mi_turno ? "bg-green-400" : ""}`}
                >
                    <p
                        className={`break-words p-1 text-center font-bold ${turno_actual.nombre.length > 30 ? "!break-all text-sm" : "text-xl"}`}
                    >
                        {turno_actual.nombre}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
