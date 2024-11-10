import { useState, useEffect } from "react";
import {
    LoadSessionJugador,
    LoadSessionPartida,
} from "@/services/session_browser";
import { Jugador, Partida } from "@/models/types";

export const usePartidaSession = () => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [partida, _setPartida_] = useState<Partida | undefined>(undefined);
    const [jugador, _setJugador_] = useState<Jugador | undefined>(undefined);

    useEffect(() => {
        const jugador = LoadSessionJugador();
        const partida = LoadSessionPartida();
        if (jugador && partida) {
            _setJugador_(jugador);
            _setPartida_(partida);
            setIsDataLoaded(true);
        }
    }, []);

    return {
        partida,
        jugador,
        isDataLoaded,
    };
};
