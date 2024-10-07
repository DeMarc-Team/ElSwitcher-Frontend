import { ReadyState } from "react-use-websocket";
import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

const useWebSocketActualizarTablero = () => {
    const { message, readyState, openConnection, closeConnection } =
        useCustomWebSocket();
    const [triggeractualizarTablero, setTriggerActualizarTablero] =
        useState(false);

    const openConnectionToTablero = (id_partida: string) => {
        openConnection(`/juego/${id_partida}/tablero`);
    };

    useEffect(() => {
        if (message.action === "actualizar_tablero") {
            setTriggerActualizarTablero(!triggeractualizarTablero);
        }
    }, [message]);

    return {
        message,
        readyState,
        openConnectionToTablero,
        closeConnection,
        triggeractualizarTablero,
    };
};

export { useWebSocketActualizarTablero }; // Esta porque esaba haciendo una nueva conexión webSocket desde el back.
