import { createContext, useContext, ReactNode } from "react";
import { useWebSocketPartida } from "@/services/websockets/websockets_partida";
import { Jugador } from "@/models/types";

interface PartidaWebsocketContextType {
    message: any;
    readyState: number;
    ganadorInfo: Jugador | null;
    closeConnection: () => void;
    openConnectionToPartida: (partida_id: string, jugador_id: string) => void;
    triggerHayGanador: boolean;
    triggerActualizarSalaEspera: boolean;
    triggerActualizarTurno: boolean;
    triggeractualizarTablero: boolean;
}

const PartidaWebsocketContext = createContext<
    PartidaWebsocketContextType | undefined
>(undefined);

export const PartidaWebsocketProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        message,
        readyState,
        triggerActualizarTurno,
        triggerActualizarSalaEspera,
        triggeractualizarTablero,
        triggerHayGanador,
        ganadorInfo,
        closeConnection,
        openConnectionToPartida,
    } = useWebSocketPartida();

    return (
        <PartidaWebsocketContext.Provider
            value={{
                message,
                readyState,
                closeConnection,
                openConnectionToPartida,
                triggerActualizarSalaEspera,
                triggerActualizarTurno,
                triggeractualizarTablero,
                triggerHayGanador,
                ganadorInfo,
            }}
        >
            {children}
        </PartidaWebsocketContext.Provider>
    );
};

export const useInsidePartidaWebSocket = () => {
    const context = useContext(PartidaWebsocketContext);
    if (!context) {
        throw new Error(
            "useInsidePartidaWebSocket debe ser usado dentro de un PartidaWebsocketProvider"
        );
    }
    return context;
};
