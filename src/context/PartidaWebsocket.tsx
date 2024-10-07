import { createContext, useContext, ReactNode, useEffect } from "react";
import { useWebSocketPartida } from "@/services/websockets/websockets_partida";

interface PartidaWebsocketContextType {
    message: any;
    readyState: number;
    closeConnection: () => void;
    openConnectionToPartida: (partida_id: string, jugador_id: string) => void;
    triggerActualizarSalaEspera: boolean;
    triggerActualizarTurno: boolean;
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
