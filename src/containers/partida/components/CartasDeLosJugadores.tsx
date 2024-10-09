import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";

const CartasDeLosJugadores = ({id_partida,id_jugador,}: {id_partida: number;id_jugador: number;}) => {
    const [cartasFiguras, setCartasFiguras] = useState<CartaFigura[][]>([]);

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const jugadores = (await ObtenerInfoPartida (id_partida)).jugadores
            const jugadoresFiltrados = jugadores.filter(jugador => jugador.id_jugador !== id_jugador);
            let cartaslist : CartaFigura[][] = []
            for (const vercartas of jugadoresFiltrados){
                const data = await ObtenerCartasFiguras(id_partida, vercartas.id_jugador);
                const cartas = data.map((carta) =>
                    imageCartaFigura(carta.figura, carta.revelada)
                );
                cartaslist.push(cartas)
            }
            setCartasFiguras(cartaslist);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            {cartasFiguras.map((cartasJugador, indexJugador) =>
                cartasJugador.map((carta, indexCarta) => (
                    <div className="w-24 h-32 m-2">
                    <Cartas
                        key={`${indexJugador}-${indexCarta}-carta-figura`}
                        imgSrc={carta.img}
                        rotation={0}
                        middle={false}
                        altText={`Carta del jugador ${indexJugador + 1} - Carta ${indexCarta + 1}`}
                    />
                    </div>
                ))
            )}
        </div>
    );
};

export {CartasDeLosJugadores}