import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Chat from "./components/Chat";
import ButtonVolverAlHome from "@/components/ButtonVolverAlHome";
import CardColorBloqueado from "./components/CardColorBloqueado";
import { LoadSessionJugador } from "@/services/session_browser";

function Partida() {
    const { jugador, partida, isDataLoaded } = usePartida();
    const id_partida = Number(useParams().id_partida);
    const [hayUnGanador, setHayUnGanador] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { openConnectionToPartida, readyState, triggerHayGanador } =
        useInsidePartidaWebSocket();
    const navigate = useNavigate();
    const session_jugador = LoadSessionJugador();

    useEffect(() => {
        if (!session_jugador) {
            setTimeout(() => {
                navigate("/#listapartidas");
            }, 100);
        }
    }, [session_jugador]);

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
                    <div className="grid h-fit w-full grid-cols-5 items-center justify-items-center max-lg:grid-cols-4">
                        <div className="col-span-2 flex w-full scale-95 flex-row items-center justify-center gap-2 max-lg:fixed max-lg:top-0 max-lg:h-[180px] max-lg:scale-90 max-lg:flex-row max-lg:justify-center max-lg:p-1">
                            <Chat
                                id_jugador={jugador.id}
                                id_partida={partida.id}
                            />

                            <div className="mr-4 flex w-full max-w-[340px] flex-col gap-2 max-lg:mr-0 max-lg:w-auto max-lg:max-w-max max-lg:flex-row">
                                <div className="flex w-full flex-col gap-2 max-lg:gap-1">
                                    <CardInfoDelTurno />
                                    <ButtonPasarTurno />
                                </div>
                                <CardMovParciales />
                            </div>
                        </div>
                        <div className="max-lg:col-span-2 max-lg:mt-24 max-lg:scale-75">
                            <Board id_partida={partida.id} />
                            <div className="mt-2 flex justify-center">
                                <CardColorBloqueado id_partida={partida.id} />
                            </div>
                        </div>
                        <div className="col-span-2 max-lg:-ml-36 max-lg:mt-24 max-lg:scale-75">
                            <CartasDeLosJugadores />
                        </div>
                    </div>
                    <div className="mt-10 flex scale-90 flex-row gap-10 max-lg:-mt-6 max-lg:pb-2">
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
                        <div className="flex min-w-[200px] flex-col justify-center gap-2 max-lg:flex-row">
                            <ButtonVolverAlHome />
                            <ButtonAbandonarPartida
                                idPartida={id_partida}
                                idJugador={jugador.id}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Partida;
