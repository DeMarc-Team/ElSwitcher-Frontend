import { useParams } from "react-router-dom";
import Board from "./components/Board";
import { LoadSessionJugador } from "@/services/session_jugador";
import CartasMovimiento from "./components/CartasMovimiento";
import CartasFigura from "./components/CartasFigura";
import CardInfoDelTurno from "./components/CardInfoTurno";
import ButtonPasarTurno from "./components/ButtonPasarTurno";
import { TurnoProvider } from "./components/turnoContext";
import { useEffect, useState } from "react";

function Partida() {
    const id_partida = Number(useParams().id_partida);
    const session = LoadSessionJugador();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    if (!id_partida || !session.id) {
        return <p>No se puede acceder a esta partida.</p>;
    }

    return (
        <div
            className={`flex h-[100vh] w-full flex-col items-center justify-center gap-10 py-5 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className="grid h-fit grid-cols-3">
                <div className="flex flex-col items-center justify-center gap-2">
                    <TurnoProvider>
                        <CardInfoDelTurno
                            id_partida={id_partida}
                            id_jugador={session.id}
                        />
                        <ButtonPasarTurno
                            id_partida={id_partida}
                            id_jugador={session.id}
                        />{" "}
                    </TurnoProvider>
                </div>
                <Board id_partida={id_partida} />
                <div></div>
            </div>
            <div className="flex flex-row gap-10">
                <TurnoProvider>
                    <CartasMovimiento
                        id_partida={id_partida}
                        id_jugador={session.id}
                    />
                    <CartasFigura id_partida={id_partida} id_jugador={session.id} />
                </TurnoProvider>
            </div>
        </div>
    );
}

export default Partida;
