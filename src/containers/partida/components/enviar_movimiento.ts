import {
    JugarCartaMovimiento,
    Casilla,
} from "@/services/api/jugar_carta_movimiento";
import { esTurnoDelJugador } from "@/containers/partida/components/es_turno_del_jugador";
import { usePartida } from "@/context/PartidaContext";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";

export const useMovimientos = () => {
    const { turno_actual, jugador, partida } = usePartida();
    const { cartaMovimientoSeleccionada, codigoCartaMovimiento } =
        useMovimientoContext();

    // Enviar movimiento al backend
    const enviarMovimiento = async (casilla1: Casilla, casilla2: Casilla) => {
        if (
            esTurnoDelJugador(
                cartaMovimientoSeleccionada,
                turno_actual,
                jugador
            )
        ) {
            if (codigoCartaMovimiento && jugador?.id && partida?.id) {
                try {
                    const response = await JugarCartaMovimiento(
                        casilla1,
                        casilla2,
                        partida.id,
                        jugador.id,
                        codigoCartaMovimiento
                    );
                    console.log("Movimiento enviado:", response);
                } catch (error) {
                    console.error("Error al enviar el movimiento:", error);
                }
            } else {
                console.log(
                    "No se ha seleccionado un código de carta de movimiento."
                );
            }
        } else {
            console.log(
                "No es el turno del jugador o no hay carta seleccionada."
            );
        }
    };

    return { enviarMovimiento };
};
