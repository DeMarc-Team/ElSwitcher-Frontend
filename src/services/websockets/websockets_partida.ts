import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";
import { Jugador } from "@/models/types";
/**
 *  Este hook es para manejar la conexión WebSocket de una partida específica.
 *  IMPORTANTE: Evitar usarlo directamente en un componente.
 * @returns
 * - `triggerActualizarSalaEspera`: Trigger para actualizar la sala de espera.
 * - `triggerActualizarTurno`: Trigger para actualizar el turno.
 * - `triggerHayGanador`: Trigger para indicar si hay un ganador.
 * - `triggeractualizarTablero`: Trigger para actualizar tablero.
 * - `triggerActualizarCartasMovimiento`: Trigger para actualizar las cartas de movimiento.
 * - `triggerSeCanceloPartida`: Trigger para indicar si se canceló la partida.
 * - `triggerActualizarCartasFigura`: Trigger para actualizar las cartas de figura.
 * - `ganadorInfo`: Información del jugador ganador.
 * - `triggerSincronizarMensaje` Trigger para indicar si hay mensajes nuevos.
 * - `objectMessages` Este tiene el objeto guardado que se retorna desde el back.
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
    const [triggerHayGanador, setTriggerHayGanador] = useState(false);
    const [triggeractualizarTablero, setTriggerActualizarTablero] =
        useState(false);
    const [
        triggerActualizarCartasMovimiento,
        setTriggerActualizarCartasMovimiento,
    ] = useState(false);
    const [triggerSeCanceloPartida, setTriggerSeCanceloPartida] =
        useState(false);
    const [triggerActualizarCartasFigura, setTriggerActualizarCartasFigura] =
        useState(false);
    const [triggerSincronizarTurno, setTriggerSincronizarTurno] =
        useState(false);
    const [triggerSincronizarMensaje, setTriggerSincronizarMensaje] =
        useState(false);
    const [objectMessages, setObjectMessages] =
        useState<ObjectMessagesProps | null>(null);

    const [ganadorInfo, setGanadorInfo] = useState<Jugador | null>(null);

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
        } else if (message.action === "hay_ganador") {
            setTriggerHayGanador(!triggerHayGanador);
            setGanadorInfo(JSON.parse(message.data));
        } else if (message.action === "actualizar_tablero") {
            setTriggerActualizarTablero(!triggeractualizarTablero);
        } else if (message.action === "actualizar_cartas_movimiento") {
            setTriggerActualizarCartasMovimiento(
                !triggerActualizarCartasMovimiento
            );
        } else if (message.action === "partida_cancelada") {
            setTriggerSeCanceloPartida(!triggerSeCanceloPartida);
        } else if (message.action === "actualizar_cartas_figura") {
            setTriggerActualizarCartasFigura(!triggerActualizarCartasFigura);
        } else if (message.action === "sincronizar_mensaje") {
            setTriggerSincronizarMensaje(!triggerSincronizarMensaje);
            setObjectMessages(JSON.parse(message.data));
        } else if (message.action === "sincronizar_turno") {
            setTriggerSincronizarTurno(!triggerSincronizarTurno);
        }
    }, [message]);

    return {
        message,
        readyState,
        closeConnection,
        openConnectionToPartida,
        triggerActualizarSalaEspera,
        triggerActualizarTurno,
        triggerHayGanador,
        ganadorInfo,
        triggeractualizarTablero,
        triggerActualizarCartasMovimiento,
        triggerSeCanceloPartida,
        triggerActualizarCartasFigura,
        triggerSincronizarMensaje,
        objectMessages,
        triggerSincronizarTurno,
    };
};

interface ObjectMessagesProps {
    message: string;
    id_jugador: number;
    type_message: "ACTION" | "USER";
}

export { useWebSocketPartida, type ObjectMessagesProps };
