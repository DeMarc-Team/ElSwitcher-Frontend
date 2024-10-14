import { Button } from "@/components/ui/button";
import { useNotification } from "@/hooks/useNotification";
import { PasarTurno } from "@/services/api/pasar_turno";
import { usePartida } from "@/context/PartidaContext";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useFiguraContext} from "@/context/FigurasContext"

export default function ButtonPasarTurno() {
    const { turno_actual, jugador, partida } = usePartida();
    const { showToastAlert, closeToast } = useNotification();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { cleanFiguraContexto } = useFiguraContext();

    const handlePasarTurno = async () => {
        if (!partida || !jugador || !turno_actual) {
            return;
        }
        if (turno_actual.id == jugador.id) {
            try {
                await PasarTurno(partida.id, jugador.id);
                cleanMovimientoContexto();
                cleanFiguraContexto();
            } catch (error) {
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
            className={`rounded border-2 border-black px-12 py-2 font-bold ${turno_actual?.id == jugador?.id ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-400"}`}
        >
            {turno_actual?.id == jugador?.id
                ? "Pasar turno"
                : "Espera tú turno"}
        </Button>
    );
}
