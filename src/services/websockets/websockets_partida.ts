import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

/**
 * TODO: Completar ...
 */
const useWebSocketPartida = () => {
    const { message, readyState, closeConnection, openConnection } =
        useCustomWebSocket();
    const [triggerActualizarSalaEspera, setTriggerActualizarSalaEspera] =
        useState(false);
    const [triggerActualizarTurno, setTriggerActualizarTurno] = useState(false);

    const openConnectionToPartida = (
        partida_id: string,
        jugador_id: string
    ) => {
        openConnection(`/partidas/${partida_id}/${jugador_id}`);
    };

    useEffect(() => {
        if (message.action === "actualizar_sala_espera") {
            setTriggerActualizarSalaEspera(!triggerActualizarSalaEspera);
        } else if (message.action === "actualizar_turno") {
            setTriggerActualizarTurno(!triggerActualizarTurno);
        }
    }, [message]);

    return {
        message,
        readyState,
        closeConnection,
        openConnectionToPartida,
        triggerActualizarSalaEspera,
        triggerActualizarTurno,
    };
};
export { useWebSocketPartida };
