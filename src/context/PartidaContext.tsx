import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useWebSocketPartida } from "@/services/websockets/websockets_partida";
import { type Jugador, type Partida } from "@/models/types";
import {
    LoadSessionJugador,
    SaveSessionJugador,
    LoadSessionPartida,
    SaveSessionPartida,
} from "@/services/session_browser";

interface PartidaContextType {
    partida?: Partida;
    jugador?: Jugador; // El jugador actual
    creador?: Jugador; // Estos dato es solo valido en la sala de espera !!
    jugadores: Jugador[];
    turno_actual?: Jugador;
    partida_iniciada: boolean;
    ganador?: Jugador;
    setPartida: (partida: Partida) => void;
    setJugador: (jugador: Jugador) => void;
    setCreador: (creador: Jugador) => void;
}

const PartidaContext = createContext<PartidaContextType | undefined>(undefined);

export const PartidaProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [partida, _setPartida_] = useState<Partida | undefined>(undefined);
    const [jugador, _setJugador_] = useState<Jugador | undefined>(undefined);
    const [creador, setCreador] = useState<Jugador | undefined>(undefined);
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [turno_actual, setTurnoActual] = useState<Jugador | undefined>(
        undefined
    );
    const [partida_iniciada, setPartidaIniciada] = useState<boolean>(false);
    const [ganador, setGanador] = useState<Jugador | undefined>(undefined);

    const { openConnectionToPartida } = useWebSocketPartida();

    const setJugador = (jugador: Jugador) => {
        SaveSessionJugador(jugador);
        _setJugador_(jugador);
    };

    const setPartida = (partida: Partida) => {
        SaveSessionPartida(partida);
        _setPartida_(partida);
    };

    // Cuando se recarga la página se vuelve a cargar la partida y el jugador
    useEffect(() => {
        const jugador = LoadSessionJugador();
        const partida = LoadSessionPartida();
        if (jugador && partida) {
            _setJugador_(jugador);
            _setPartida_(partida);
            console.log("Se cargaron los datos de la sesión.");
        }
    }, []);

    return (
        <PartidaContext.Provider
            value={{
                partida,
                jugador,
                creador,
                jugadores,
                turno_actual,
                partida_iniciada,
                ganador,
                setPartida,
                setJugador,
                setCreador,
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
