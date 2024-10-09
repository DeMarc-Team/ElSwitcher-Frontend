import { createContext, useContext, ReactNode } from "react";
import { useWebSocketPartida } from "@/services/websockets/websockets_partida";
import { Jugador } from "@/models/types";

interface PartidaWebsocketContextType {
    message: any;
    readyState: number;
    hayGanador: boolean;
    ganadorInfo: Jugador | null;
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
        hayGanador,
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
                hayGanador,
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
