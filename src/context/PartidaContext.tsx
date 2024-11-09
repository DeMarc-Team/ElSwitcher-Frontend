import { createContext, useContext, useState, ReactNode } from "react";
import { type Jugador, type Partida } from "@/models/types";
import { usePartidaSession } from "@/hooks/usePartidaSession";

interface PartidaContextType {
    partida: Partida | undefined;
    jugador: Jugador | undefined;
    ganador: Jugador | undefined;
    isDataLoaded: boolean;
    turno_actual: Jugador | undefined;
    messagesList: objectMessagesProps[];
    setPartida: (partida: Partida) => void;
    setJugador: (jugador: Jugador) => void;
    setGanador: (jugador: Jugador) => void;
    setTurnoActual: (jugador: Jugador) => void;
    setMessagesList: (messagesList: objectMessagesProps[]) => void;
    receiverMessages: (message: objectMessagesProps) => void;
}

interface objectMessagesProps {
    message: string;
    id_jugador: number;
    type_message: "ACTION" | "USER";
}

const PartidaContext = createContext<PartidaContextType | undefined>(undefined);

export const PartidaProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { partida, jugador, isDataLoaded, setPartida, setJugador } =
        usePartidaSession();
    const [ganador, setGanador] = useState<Jugador | undefined>(undefined);
    const [turno_actual, setTurnoActual] = useState<Jugador | undefined>(
        undefined
    );
    const [messagesList, setMessagesList] = useState<objectMessagesProps[]>([]);
    const receiverMessages = (message: objectMessagesProps) => {
        setMessagesList((state) => [...state, message]);
        //scrollToBottom();
    };

    return (
        <PartidaContext.Provider
            value={{
                partida,
                jugador,
                isDataLoaded,
                ganador,
                turno_actual,
                messagesList,
                setPartida,
                setJugador,
                setGanador,
                setTurnoActual,
                setMessagesList,
                receiverMessages,
            }}
        >
            {children}
        </PartidaContext.Provider>
    );
};

export const usePartida = () => {
    const context = useContext(PartidaContext);
    if (!context) {
        throw new Error("usePartida debe usarse dentro de un PartidaProvider");
    }
    return context;
};
