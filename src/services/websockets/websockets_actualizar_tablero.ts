import { useCustomWebSocket } from "./websockets";
import { useEffect, useState } from "react";

const useWebSocketActualizarTablero = () => {
    const { message, readyState, openConnection, closeConnection } =
        useCustomWebSocket();
    const [actualizarTablero, setActualizarTablero] = useState(false);

    const openConnectionToTablero = (id_partida: string) => {
        openConnection(`/juego/${id_partida}/tablero`);
    };
};

export { useWebSocketActualizarTablero };
