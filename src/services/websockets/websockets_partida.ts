import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

/**
 *  Este hook es para manejar la conexión WebSocket de una partida específica.
 *  IMPORTANTE: Evitar usarlo directamente en un componente.
 * @returns
 * - `triggerActualizarSalaEspera`: Trigger para actualizar la sala de espera.
 * - `triggerActualizarTurno`: Trigger para actualizar el turno.
 * - `triggeractualizarTablero`: Trigger para actualizar tablero.
 * @note También se retorna la información de la conexión WebSocket:
 *  - `message`: El último mensaje recibido.
 *  - `readyState`: El estado de la conexión WebSocket.
 *  - `closeConnection`: Función para cerrar la conexión manualmente.
 *  - `openConnectionToPartida`: Función para abrir la conexión a una partida específica.
 */
const useWebSocketPartida = () => {
    const { message, readyState, closeConnection, openConnection } =
        useCustomWebSocket();
    const [triggerActualizarSalaEspera, setTriggerActualizarSalaEspera] =
        useState(false);
    const [triggerActualizarTurno, setTriggerActualizarTurno] = useState(false);
    const [triggeractualizarTablero, setTriggerActualizarTablero] =
        useState(false);

    const openConnectionToPartida = (
        partida_id: string,
        jugador_id: string
    ) => {
        openConnection(`/partidas/${partida_id}/jugador/${jugador_id}`);
    };

    useEffect(() => {
        if (message.action === "actualizar_sala_espera") {
            setTriggerActualizarSalaEspera(!triggerActualizarSalaEspera);
        } else if (message.action === "actualizar_turno") {
            setTriggerActualizarTurno(!triggerActualizarTurno);
        } else if (message.action === "actualizar_tablero") {
            setTriggerActualizarTablero(!triggeractualizarTablero);
        }
    }, [message]);

    return {
        message,
        readyState,
        closeConnection,
        openConnectionToPartida,
        triggerActualizarSalaEspera,
        triggerActualizarTurno,
        triggeractualizarTablero,
    };
};
export { useWebSocketPartida };
