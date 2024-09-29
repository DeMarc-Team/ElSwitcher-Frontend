import { Button } from "@/components/ui/button";
import { useNotification } from "@/hooks/useNotification";
import { PasarTurno } from "@/services/api/pasar_turno";
import { useTurno } from "./turnoContext";

export default function ButtonPasarTurno({
    id_partida,
    id_jugador,
}: Readonly<{
    id_partida: number;
    id_jugador: number;
}>) {
    const { turnoId } = useTurno();
    const { showToastAlert, closeToast } = useNotification();
    const handlePasarTurno = async () => {
        if (turnoId == id_jugador) {
            try {
                await PasarTurno(id_partida, id_jugador);
            } catch (error) {
                console.error("Error al pasar el turno:", error);
                showToastAlert("Error al pasar el turno.");
                setTimeout(() => {
                    closeToast();
                }, 1000);
            }
        }
    };
    return (
        <Button
            onClick={handlePasarTurno}
            className={`rounded border-2 border-black px-12 py-2 font-bold ${turnoId == id_jugador ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-400"}`}
        >
            {turnoId == id_jugador ? "Pasar turno" : "Espera tú turno"}
        </Button>
    );
}
