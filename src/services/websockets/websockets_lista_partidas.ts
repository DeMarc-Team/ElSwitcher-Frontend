import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

/**
 * Este hook personalizado se encarga de informar cuando hay que actualizar
 * las partidas. Esto lo consigue informando a través de un trigger (disparador)
 * el cual se debe usa en un `useEffect` para actualizar la lista de partidas.
 * @returns `triggerActualizaPartidas`: Trigger para actualizar la lista de partidas.
 * @returns `triggerActualizaPartidasActivas`: Trigger para actualizar la lista de partidas activas.
 * @returns `idPartidaABorrar`: ID de la partida que se debe borrar al recibir un mensaje de partida activa.
 * @note También se retorna la información de la conexión WebSocket:
 *  - `message`: El último mensaje recibido.
 *  - `readyState`: El estado de la conexión WebSocket.
 *  - `closeConnection`: Función para cerrar la conexión manualmente.
 */
const useWebSocketListaPartidas = () => {
    const { message, readyState, closeConnection, openConnection } =
        useCustomWebSocket();
    const [triggerActualizaPartidas, setTriggerActualizaPartidas] =
        useState(false);
    const [
        triggerActualizaPartidasActivas,
        setTriggerActualizaPartidasActivas,
    ] = useState(false);
    const [idPartidaABorrar, setIdPartidaABorrar] = useState(undefined);

    useEffect(() => {
        openConnection("/partidas/");
    }, []);

    useEffect(() => {
        if (message.action === "actualizar_partidas") {
            setTriggerActualizaPartidas(!triggerActualizaPartidas);
        } else if (message.action === "actualizar_partidas_activas") {
            const data = JSON.parse(message.data);
            setIdPartidaABorrar(data.id_partida);
            setTriggerActualizaPartidasActivas(
                !triggerActualizaPartidasActivas
            );
        }
    }, [message]);

    return {
        message,
        readyState,
        closeConnection,
        triggerActualizaPartidas,
        triggerActualizaPartidasActivas,
        idPartidaABorrar,
    };
};
export { useWebSocketListaPartidas };
