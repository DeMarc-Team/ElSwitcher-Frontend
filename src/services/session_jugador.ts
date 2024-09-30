const SESSION_NAME = "session_jugador";

interface SessionJugador {
    id: number;
    nombre: string;
    id_partida: number;
}

const LoadSessionJugador = (): SessionJugador => {
    const session = sessionStorage.getItem(SESSION_NAME);
    if (!session) {
        throw new Error("No hay sesión de jugador.");
    }
    try {
        return JSON.parse(session) as SessionJugador;
    } catch (error) {
        throw new Error("Error al cargar la sesión de jugador: " + error);
    }
};

const SaveSessionJugador = (session: SessionJugador) => {
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(session));
};

const RemoveSessionJugador = () => {
    sessionStorage.removeItem(SESSION_NAME);
};

export {
    LoadSessionJugador,
    SaveSessionJugador,
    RemoveSessionJugador,
    type SessionJugador,
};
