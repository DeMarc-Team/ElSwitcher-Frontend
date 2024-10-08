const SESSION_JUGADOR = "session_jugador";
const SESSION_PARTIDA = "session_partida";
import { type Jugador, type Partida } from "@/models/types";

const LoadSessionJugador = (): Jugador | undefined => {
    const session = sessionStorage.getItem(SESSION_JUGADOR);
    try {
        return session ? (JSON.parse(session) as Jugador) : undefined;
    } catch (error) {
        throw new Error("Error al cargar la sesión de jugador: " + error);
    }
};

const LoadSessionPartida = (): Partida | undefined => {
    const session = sessionStorage.getItem(SESSION_PARTIDA);
    try {
        return session ? (JSON.parse(session) as Partida) : undefined;
    } catch (error) {
        throw new Error("Error al cargar la sesión de partida: " + error);
    }
};

const SaveSessionJugador = (jugador: Jugador) => {
    sessionStorage.setItem(SESSION_JUGADOR, JSON.stringify(jugador));
};

const SaveSessionPartida = (partida: Partida) => {
    sessionStorage.setItem(SESSION_PARTIDA, JSON.stringify(partida));
};

const RemoveSessionJugador = () => {
    sessionStorage.removeItem(SESSION_JUGADOR);
};

const RemoveSessionPartida = () => {
    sessionStorage.removeItem(SESSION_PARTIDA);
};

export {
    LoadSessionJugador,
    LoadSessionPartida,
    SaveSessionJugador,
    SaveSessionPartida,
    RemoveSessionJugador,
    RemoveSessionPartida,
};
