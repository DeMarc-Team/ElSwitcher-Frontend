import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ObtenerInfoTurno } from "@/services/api/obtener_info_turno";
import { useEffect, useState } from "react";
import { useNotification } from "@/hooks/useNotification";

export default function CardInfoDelTurno({
    id_partida,
    id_jugador,
}: Readonly<{ id_partida: string; id_jugador: string }>) {
    const [idJugadorDelTurno, setIdJugadorDelTurno] = useState<number>();
    const [nombreJugador, setNombreJugador] = useState("");
    const { showToastError } = useNotification();
    useEffect(() => {
        fecthInfoTurno();
        setTimeout(async () => {
            await fecthInfoTurno();
        }, 1000);
    }, []);

    const fecthInfoTurno = async () => {
        try {
            const infoTurno = await ObtenerInfoTurno(id_partida);
            setIdJugadorDelTurno(Number(infoTurno.id_jugador));
            setNombreJugador(infoTurno.nombre_jugador);
        } catch (error) {
            showToastError("Error al obtener la información del turno");
        }
    };

    const esMiTurno = idJugadorDelTurno === Number(id_jugador);

    if (!idJugadorDelTurno || nombreJugador === "") {
        return <div>Cargando...</div>;
    }
    return (
        <Card className="w-64 py-4">
            <CardContent className="flex flex-col items-center justify-center gap-3">
                <CardTitle>TURNO DE</CardTitle>
                <CardDescription></CardDescription>
                <div
                    className={`flex h-40 w-40 items-center justify-center rounded-full border-2 border-black text-center ${esMiTurno ? "bg-green-400" : ""}`}
                >
                    <p
                        className={`break-words p-5 text-center font-bold ${nombreJugador.length > 30 ? "!break-all text-sm" : "text-xl"}`}
                    >
                        {nombreJugador}
                    </p>
                </div>
                <p className="text-center">
                    {esMiTurno ? (
                        <span className="text-base">Es tú turno !!</span>
                    ) : (
                        <span className="text-sm">
                            Espera hasta que sea tu turno.
                        </span>
                    )}
                </p>
            </CardContent>
        </Card>
    );
}
