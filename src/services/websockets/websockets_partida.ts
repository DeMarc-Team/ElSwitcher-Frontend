import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

/**
 * TODO: Completar ...
 */
const useWebSocketPartida = (id: number) => {
    const { message, readyState, closeConnection } = useCustomWebSocket(
        "/partidas/" + id + "/"
    );
    // const [trigger1, setTrigger1] = useState(false);
    // const [trigger2, setTrigger1] = useState(false);
    // const [trigger3, setTrigger1] = useState(false);
    // Continuar con más triggers...

    useEffect(() => {
        // if (message.action === "accion1") {
        //     setTrigger1(!trigger1);
        // }
        // if (message.action === "accion2") {
        //     setTrigger2(!trigger2);
        // }
        // if (message.action === "accion3") {
        //     setTrigger3(!trigger3);
        // }
        // Continuar con más acciones...
    }, [message]);

    return {
        message,
        readyState,
        closeConnection,
        // trigger1,
        // trigger2,
        // trigger3,
        // Continuar con más triggers...
    };
};
export { useWebSocketPartida };
