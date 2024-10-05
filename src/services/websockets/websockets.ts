import { WS_HOST } from "./const";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface WebSocketMessage {
    action: string;
    data?: any;
}

/**
 * Hook personalizado para manejar conexiones WebSocket de forma controlada.
 * @returns
 * - message: El último mensaje recibido.
 * - readyState: El estado de la conexión WebSocket.
 * - connect: Función para conectar manualmente al WebSocket con un path específico.
 * - disconnect: Función para desconectar manualmente.
 * - openConnection: Función para conectar manualmente al WebSocket con un path específico.
 * - closeConnection: Función para cerrar la conexión manualmente.
 */
const useCustomWebSocket = () => {
    const [message, setMessage] = useState<WebSocketMessage>({ action: "" });
    const [socketUrl, setSocketUrl] = useState<string | null>(null);
    const { lastMessage, readyState, getWebSocket } = useWebSocket(
        socketUrl,
        {
            share: false,
            shouldReconnect: () => true,
            onOpen: () => console.log("Conexión WebSocket abierta"),
            onClose: () => console.log("Conexión WebSocket cerrada"),
            onError: (event) => console.error("Error en WebSocket:", event),
        },
        socketUrl !== null // Solo habilita la conexión si socketUrl no es null
    );

    // Manejar el último mensaje recibido
    useEffect(() => {
        if (lastMessage?.data) {
            const { action, data } = JSON.parse(lastMessage.data);
            if (action && data) {
                setMessage({ action, data });
            } else if (action) {
                setMessage({ action });
            }
        }
    }, [lastMessage]);

    /**
     * Conectar al WebSocket con un path específico.
     * @param path  El path al que se conectará el WebSocket.
     *             Ejemplo: "/partidas/1/" para conectarse a la partida con ID 1.
     * @note Importante que el path empiece con "/".
     */
    const openConnection = (path: string) => {
        setSocketUrl(WS_HOST + path); // Establece el URL y activa la conexión
        console.log(`Conectando a WebSocket: ${WS_HOST + path}`);
    };

    /**
     * Cerrar la conexión WebSocket manualmente.
     */
    const closeConnection = () => {
        getWebSocket()?.close();
        setSocketUrl(null); // Desactiva la conexión
        console.log("Conexión WebSocket cerrada manualmente.");
    };

    return {
        message,
        readyState,
        openConnection,
        closeConnection,
    };
};

export { useCustomWebSocket, type WebSocketMessage };