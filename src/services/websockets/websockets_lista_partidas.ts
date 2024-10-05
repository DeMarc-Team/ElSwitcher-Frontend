import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

/**
 * Este hook personalizado se encarga de informar cuando hay que actualizar
 * las partidas. Esto lo consigue informando a través de un trigger (disparador)
 * el cual se debe usa en un `useEffect` para actualizar la lista de partidas.
 * @returns `triggerActualizaPartidas`: Trigger para actualizar la lista de partidas.
 * @note También se retorna la información de la conexión WebSocket:
 *  - `message`: El último mensaje recibido.
 *  - `readyState`: El estado de la conexión WebSocket.
 *  - `closeConnection`: Función para cerrar la conexión manualmente.
 */
const useWebSocketListaPartidas = () => {
    const { message, readyState, closeConnection } =
        useCustomWebSocket("/partidas/");
    const [triggerActualizaPartidas, setTriggerActualizaPartidas] =
        useState(false);
    useEffect(() => {
        if (message.action === "actualizar_partidas") {
            setTriggerActualizaPartidas(!triggerActualizaPartidas);
        }
    }, [message]);

    return {
        message,
        readyState,
        closeConnection,
        triggerActualizaPartidas,
    };
};
export { useWebSocketListaPartidas };
