import { useState, useEffect } from "react";
import {
    LoadSessionJugador,
    SaveSessionJugador,
    LoadSessionPartida,
    SaveSessionPartida,
} from "@/services/session_browser";
import { Jugador, Partida } from "@/models/types";

export const usePartidaSession = () => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [partida, _setPartida_] = useState<Partida | undefined>(undefined);
    const [jugador, _setJugador_] = useState<Jugador | undefined>(undefined);

    const setJugador = (jugador: Jugador) => {
        SaveSessionJugador(jugador);
        _setJugador_(jugador);
    };

    const setPartida = (partida: Partida) => {
        SaveSessionPartida(partida);
        _setPartida_(partida);
    };

    useEffect(() => {
        const jugador = LoadSessionJugador();
        const partida = LoadSessionPartida();
        if (jugador && partida) {
            _setJugador_(jugador);
            _setPartida_(partida);
            setIsDataLoaded(true);
            console.log("Datos cargados desde la sesión.");
        }
    }, []);

    return {
        partida,
        jugador,
        isDataLoaded,
        setPartida,
        setJugador,
    };
};
