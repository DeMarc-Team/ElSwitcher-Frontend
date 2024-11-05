import { createContext, useContext, useState, ReactNode } from "react";
import { type Jugador, type Partida } from "@/models/types";
import { usePartidaSession } from "@/hooks/usePartidaSession";

interface PartidaContextType {
    partida: Partida | undefined;
    jugador: Jugador | undefined;
    ganador: Jugador | undefined;
    isDataLoaded: boolean;
    turno_actual: Jugador | undefined;
    finalizo_turno: boolean;
    setPartida: (partida: Partida) => void;
    setJugador: (jugador: Jugador) => void;
    setGanador: (jugador: Jugador) => void;
    setTurnoActual: (jugador: Jugador) => void;
    setFinalizoTurno: (finalizo_turno: boolean) => void;
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
    const [finalizo_turno, setFinalizoTurno] = useState<boolean>(false);

    return (
        <PartidaContext.Provider
            value={{
                partida,
                jugador,
                isDataLoaded,
                ganador,
                turno_actual,
                finalizo_turno,
                setPartida,
                setJugador,
                setGanador,
                setTurnoActual,
                setFinalizoTurno,
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
