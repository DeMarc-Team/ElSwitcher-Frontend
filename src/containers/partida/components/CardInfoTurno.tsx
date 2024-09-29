import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ObtenerInfoTurno } from "@/services/api/obtener_info_turno";
import { useEffect, useState } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useTurno } from "./turnoContext";

export default function CardInfoDelTurno({
    id_partida,
    id_jugador,
}: Readonly<{ id_partida: number; id_jugador: number }>) {
    const [idJugadorDelTurno, setIdJugadorDelTurno] = useState<number>();
    const [nombreJugador, setNombreJugador] = useState("");
    const { setTurnoId } = useTurno();
    const { showToastError } = useNotification();
    useEffect(() => {
        fecthInfoTurno();
        setInterval(async () => {
            await fecthInfoTurno();
        }, 1000);
    }, []);

    const fecthInfoTurno = async () => {
        try {
            const infoTurno = await ObtenerInfoTurno(id_partida);
            setTurnoId(infoTurno.id_jugador);
            setIdJugadorDelTurno(infoTurno.id_jugador);
            setNombreJugador(infoTurno.nombre_jugador);
        } catch (error) {
            showToastError("Error al obtener la información del turno");
        }
    };

    const esMiTurno = idJugadorDelTurno === id_jugador;

    if (!idJugadorDelTurno || nombreJugador === "") {
        return <div>Cargando...</div>;
    }
    return (
        <Card className="h-fit w-fit border-2 border-black bg-yellow-100 p-4">
            <CardContent className="flex flex-row items-center justify-center gap-6 p-0">
                <div>
                    {" "}
                    <CardTitle>TURNO DE</CardTitle>
                    <CardDescription className="">
                        <p className="text-center text-base">
                            {esMiTurno ? (
                                <span>Es tú turno !!</span>
                            ) : (
                                <span>Otro jugador</span>
                            )}
                        </p>
                    </CardDescription>
                </div>
                <div
                    className={`flex h-24 w-40 items-center justify-center rounded-md border-2 border-dashed border-black text-center ${esMiTurno ? "bg-green-400" : ""}`}
                >
                    <p
                        className={`break-words p-1 text-center font-bold ${nombreJugador.length > 30 ? "!break-all text-sm" : "text-xl"}`}
                    >
                        {nombreJugador}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
