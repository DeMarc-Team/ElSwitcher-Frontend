const SESSION_ACTUAL = "session_actual";
const SESSIONS = "sessions";
import { type Jugador, type Partida } from "@/models/types";

interface Session {
    jugador: Jugador;
    partida: Partida;
}

const LoadSessionJugador = (): Jugador | undefined => {
    const session = GetSessionActual();
    return session ? session.jugador : undefined;
};

const LoadSessionPartida = (): Partida | undefined => {
    const session = GetSessionActual();
    return session ? session.partida : undefined;
};

const SaveNewSession = (jugador: Jugador, partida: Partida) => {
    const session: Session = { jugador, partida };
    console.log(session);
    PushSession(session);
    SaveSessionActual(partida.id);
};

const RemoveCurrentSession = () => {
    const sessions = GetSessionActual();
    if (sessions) {
        RemoveSession(sessions.partida.id);
    }
    RemoveSessionActual();
};

const RemoveSpecificSession = (id_partida: number) => {
    RemoveSession(id_partida);
    RemoveSessionActual();
};

const GetAllSessions = () => {
    return LoadSessions();
};

const SetCurrentSession = (id_partida: number) => {
    SaveSessionActual(id_partida);
};

// ------------------- Funciones Privadas -------------------

// Funciones para la SESSION_ACTUAL
const SaveSessionActual = (id_partida: number) => {
    const session = GetSession(id_partida);
    if (session) {
        sessionStorage.setItem(SESSION_ACTUAL, JSON.stringify(session));
    }
};

const GetSessionActual = (): Session | undefined => {
    const session_actual = sessionStorage.getItem(SESSION_ACTUAL);
    return GetSession(
        session_actual ? JSON.parse(session_actual).partida.id : -1
    );
};

const RemoveSessionActual = () => {
    sessionStorage.removeItem(SESSION_ACTUAL);
};

// Funciones para las SESSIONS (ie operan sobre el arreglo)

const GetSession = (id_partida: number): Session | undefined => {
    const sessions = LoadSessions();
    return sessions.find((session) => session.partida.id === id_partida);
};

const RemoveSession = (id_partida: number) => {
    const sessions = LoadSessions();
    const new_sessions = sessions.filter(
        (session) => session.partida.id !== id_partida
    );
    sessionStorage.setItem(SESSIONS, JSON.stringify(new_sessions));
};

const PushSession = (session: Session) => {
    const sessions = LoadSessions();
    sessions.push(session);
    sessionStorage.setItem(SESSIONS, JSON.stringify(sessions));
};

const LoadSessions = (): Session[] => {
    const session = sessionStorage.getItem(SESSIONS);
    try {
        return session ? (JSON.parse(session) as [Session]) : [];
    } catch (error) {
        throw new Error("Error al cargar la sesión" + error);
    }
};

export {
    LoadSessionJugador,
    LoadSessionPartida,
    SaveNewSession,
    RemoveSession,
    RemoveCurrentSession,
    RemoveSpecificSession,
    GetAllSessions,
    SetCurrentSession,
    type Session,
};
