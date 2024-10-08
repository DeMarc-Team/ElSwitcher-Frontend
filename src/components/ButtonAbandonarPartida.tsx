import { Button } from "@/components/ui/button";
import { AbandonarPartida } from "@/services/api/abandonar_partida";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { RemoveSessionJugador } from "@/services/session_jugador";

export default function ButtonAbandonarPartida({
    idPartida,
    idJugador,
}: Readonly<{
    idPartida: number;
    idJugador: number;
}>) {
    const { showToastError } = useNotification();
    const navigate = useNavigate();

    const handleButtonAbandonarPartida = async () => {
        try {
            await AbandonarPartida(idPartida, idJugador);
            RemoveSessionJugador();
            navigate("/#listapartidas");
        } catch (error) {
            showToastError("Error al abandonar la partida.");
        }
    };
    return (
        <Button
            className="border-2 border-black hover:bg-red-600"
            onClick={handleButtonAbandonarPartida}
            variant="destructive"
        >
            Abandonar Partida
        </Button>
    );
}
