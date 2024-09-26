import { Button } from "@/components/ui/button";
import { useNotification } from "@/hooks/useNotification";
import { PasarTurno } from "@/services/api/pasar_turno";

export default function ButtonPasarTurno({
    id_partida,
    id_jugador,
}: Readonly<{
    id_partida: string;
    id_jugador: string;
}>) {
    const { showToastInfo, showToastError } = useNotification();
    const handlePasarTurno = async () => {
        try {
            await PasarTurno(id_partida, id_jugador);
            showToastInfo("Pasaste tú turno !!!");
        } catch (error) {
            console.error("Error al pasar el turno:", error);
            showToastError("Error al pasar el turno.");
        }
    };
    return (
        <Button
            onClick={handlePasarTurno}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
            Pasar turno
        </Button>
    );
}
