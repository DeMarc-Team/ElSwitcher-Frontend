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
import { ScrollArea } from "@/components/ui/scroll-area"

function Partida() {
    const { jugador, partida, isDataLoaded } = usePartida();
    const id_partida = Number(useParams().id_partida);
    const [isVisible, setIsVisible] = useState(false);
    const { openConnectionToPartida, readyState } = useInsidePartidaWebSocket();

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

    if (!jugador || !partida || partida.id !== id_partida) return;

    return (
        <div
            className={`flex h-[100vh] w-full flex-col items-center justify-center gap-10 py-5 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="grid h-fit grid-cols-3">
                <div className="flex flex-col items-center justify-center gap-2">
                    <ButtonAbandonarPartida
                        idPartida={id_partida}
                        idJugador={jugador.id}
                    />
                    <CardInfoDelTurno />
                    <ButtonPasarTurno />
                </div>
                    <Board id_partida={partida.id} />
                <div>
                    <div>
                        <ScrollArea className="h-72 w-65 rounded-md border bg-yellow-100 ">
                            <h2 className="text-center font-bold bg-yellow-100 ">Carta de los otros jugadores</h2>
                            <CartasDeLosJugadores id_jugador={jugador.id} id_partida={id_partida}/>
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-10">
                <CartasMovimiento
                    id_partida={partida.id}
                    id_jugador={jugador.id}
                />
                <CartasFigura id_partida={id_partida} id_jugador={jugador.id} />
            </div>
            
        </div>
    );
}

export default Partida;
