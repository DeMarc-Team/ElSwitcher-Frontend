import { WS_HOST } from "./const";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface WebSocketMessage {
    action: string;
    data?: any;
}

/**
 * Hook personalizado para manejar conexiones WebSocket.
 * @param path El path del WebSocket a conectar, importante que empiece por "/"
 * @note Ej: path: "/partidas/"
 * @returns
 * - message: El último mensaje recibido.
 * - readyState: El estado de la conexión WebSocket.
 * - closeConnection: Función para cerrar la conexión manualmente.
 */
const useCustomWebSocket = (path: string) => {
    const [message, setMessage] = useState<WebSocketMessage>({ action: "" });
    const { lastMessage, readyState, getWebSocket } = useWebSocket(
        WS_HOST + path,
        {
            share: false,
            shouldReconnect: () => true,
            onOpen: () => console.log("Conexión WebSocket abierta"),
            onClose: () => console.log("Conexión WebSocket cerrada"),
            onError: (event) => console.error("Error en WebSocket:", event),
        }
    );

    // Filtrar y manejar el último mensaje recibido
    useEffect(() => {
        if (lastMessage?.data) {
            const { action, data } = JSON.parse(lastMessage.data);
            if (action && data) {
                // Si hay datos
                setMessage({ action, data });
            } else if (action) {
                // Si solo hay acción
                setMessage({ action });
            }
        }
    }, [lastMessage]);

    // Cerrar la conexión manualmente si es necesario
    const closeConnection = () => {
        getWebSocket()?.close();
        console.log("Conexión WebSocket cerrada manualmente.");
    };

    return {
        message,
        readyState,
        closeConnection,
    };
};

export { useCustomWebSocket, type WebSocketMessage };
