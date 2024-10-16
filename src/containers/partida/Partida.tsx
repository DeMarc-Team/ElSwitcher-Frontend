import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "./components/Board";
import CartasMovimiento from "./components/CartasMovimiento";
import CartasFigura from "./components/CartasFigura";
import CardInfoDelTurno from "./components/CardInfoTurno";
import ButtonPasarTurno from "./components/ButtonPasarTurno";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import ButtonAbandonarPartida from "@/components/ButtonAbandonarPartida";
import { CartasDeLosJugadores } from "./components/CartasDeLosJugadores";
import CardDespedida from "./components/CardDespedida";
import { useEffectSkipFirst } from "@/hooks/useEffectSkipFirst";
import CardMovParciales from "./components/CardMovParciales";

function Partida() {
    const { jugador, partida, isDataLoaded } = usePartida();
    const id_partida = Number(useParams().id_partida);
    const [hayUnGanador, setHayUnGanador] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { openConnectionToPartida, readyState, triggerHayGanador } =
        useInsidePartidaWebSocket();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isDataLoaded) {
                setIsVisible(true);
            }
        }, 100);
        return () => clearTimeout(timeout);
    }, [isDataLoaded]);

    // Conectar al WebSocket de la partida por si el jugador reinicia la página.
    useEffect(() => {
        if (
            isDataLoaded &&
            jugador &&
            id_partida &&
            readyState != 0 &&
            readyState != 1
        ) {
            console.log("Reconectando al WebSocket de la partida...");
            openConnectionToPartida(String(id_partida), String(jugador.id));
        }
    }, [isDataLoaded]);

    useEffectSkipFirst(() => {
        setHayUnGanador(true);
    }, [triggerHayGanador]);

    if (!jugador || !partida || partida.id !== id_partida) return;

    return (
        <>
            {hayUnGanador ? (
                <CardDespedida />
            ) : (
                <div
                    className={`flex h-[100vh] w-full flex-col items-center justify-center gap-10 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                    <div className="grid h-fit w-full grid-cols-3 items-center justify-items-center">
                        <div className="flex w-full scale-95 flex-col items-center justify-center gap-2">
                            <CardInfoDelTurno />
                            <ButtonPasarTurno />
                            <CardMovParciales />
                        </div>
                        <Board id_partida={partida.id} />
                        <div>
                            <CartasDeLosJugadores
                                id_jugador={jugador.id}
                                id_partida={id_partida}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-10">
                        <CartasMovimiento
                            id_partida={partida.id}
                            id_jugador={jugador.id}
                        />
                        <CartasFigura
                            id_partida={partida.id}
                            id_jugador={jugador.id}
                        />
                    </div>
                    <div className="fixed right-5 top-5">
                        <ButtonAbandonarPartida
                            idPartida={id_partida}
                            idJugador={jugador.id}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Partida;
