import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "./components/Board";
import CartasMovimiento from "./components/CartasMovimiento";
import CartasFigura from "./components/CartasFigura";
import CardInfoDelTurno from "./components/CardInfoTurno";
import ButtonPasarTurno from "./components/ButtonPasarTurno";
import { usePartida } from "@/context/PartidaContext";

function Partida() {
    const { jugador, partida } = usePartida();
    const id_partida = Number(useParams().id_partida);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    if (!jugador || !partida || partida.id !== id_partida) {
        return <p>No se puede acceder a esta partida.</p>;
    }

    return (
        <div
            className={`flex h-[100vh] w-full flex-col items-center justify-center gap-10 py-5 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="grid h-fit grid-cols-3">
                <div className="flex flex-col items-center justify-center gap-2">
                    <CardInfoDelTurno />
                    <ButtonPasarTurno />
                </div>
                <Board id_partida={partida.id} />
                <div></div>
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
