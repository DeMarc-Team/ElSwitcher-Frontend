import { useState, useEffect } from "react";
import {
    imageCartaMovimiento,
    type CartaMovimiento,
} from "./img_cartas_movimiento";
import { ObtenerCartasMovimientos } from "@/services/api/obtener_carta_movimiento";
import Cartas from "./Cartas";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";

const CartasDeLosJugadores = ({id_partida,id_jugador,}: {id_partida: number;id_jugador: number;}) => {
    const [cartasMovimiento, setCartasMovimiento] = useState<CartaMovimiento[][]>([]);

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const jugadores = (await ObtenerInfoPartida (id_partida)).jugadores
            const jugadoresFiltrados = jugadores.filter(jugador => jugador.id_jugador !== id_jugador);
            let cartaslist : CartaMovimiento[][] = []
            for (const vercartas of jugadoresFiltrados){
                const data = await ObtenerCartasMovimientos(id_partida, vercartas.id_jugador);
                const cartas = data.map((carta) =>
                    imageCartaMovimiento(carta.movimiento)
                );
                cartaslist.push(cartas)
            }
            setCartasMovimiento(cartaslist);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            {cartasMovimiento.map((cartasJugador, indexJugador) =>
                cartasJugador.map((carta, indexCarta) => (
                    <Cartas
                        key={`${indexJugador}-${indexCarta}-carta-figura`}
                        imgSrc={carta.img}
                        rotation={0}
                        middle={false}
                        altText={`Carta del jugador ${indexJugador + 1} - Carta ${indexCarta + 1}`}
                    />
                ))
            )}
        </div>
    );
};

export {CartasDeLosJugadores}