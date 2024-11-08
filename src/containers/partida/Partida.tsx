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
import CardDespedida from "./components/CardDespedida";
import { useEffectSkipFirst } from "@/hooks/useEffectSkipFirst";
import CardMovParciales from "./components/CardMovParciales";
import { CartasDeLosJugadores } from "./components/CartasDeLosJugadores";

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
                    className={`flex h-[100vh] w-full flex-col items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                    <div className="grid h-fit w-full grid-cols-3 items-center justify-items-center max-lg:grid-cols-2">
                        <div className="flex w-full scale-95 flex-col items-center justify-center gap-2 max-lg:fixed max-lg:top-0 max-lg:scale-75 max-lg:flex-row">
                            <div className="flex w-full flex-col gap-2 max-lg:gap-1">
                                <CardInfoDelTurno />
                                <ButtonPasarTurno />
                            </div>
                            <CardMovParciales />
                        </div>
                        <div className="max-lg:mt-24 max-lg:scale-75">
                            <Board id_partida={partida.id} />
                        </div>
                        <div className="ml-6 max-lg:mt-24 max-lg:scale-75">
                            <CartasDeLosJugadores />
                        </div>
                    </div>
                    <div className="mt-10 flex scale-90 flex-row gap-10 max-lg:mt-0">
                        <CartasMovimiento
                            id_partida={partida.id}
                            id_jugador={jugador.id}
                        />
                        <CartasFigura
                            id_partida={partida.id}
                            id_jugador={jugador.id}
                        />
                    </div>
                    <div className="fixed bottom-5 left-5 max-lg:bottom-1 max-lg:left-auto max-lg:scale-90">
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
