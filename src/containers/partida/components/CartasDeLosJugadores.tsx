import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";

const CartasDeLosJugadores = ({id_partida,id_jugador,}: {id_partida: number;id_jugador: number;}) => {
    const [cartasFiguras, setCartasFiguras] = useState<CartaFigura[][]>([]);
    const [nombresJugadores, setNombresJugadores] = useState<string[]>([]); 

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const jugadores = (await ObtenerInfoPartida (id_partida)).jugadores
            const jugadoresFiltrados = jugadores.filter(jugador => jugador.id_jugador !== id_jugador);
            let cartaslist : CartaFigura[][] = []
            let nombres : string [] = []
            for (const jugadoresPartida of jugadoresFiltrados){
                const data = await ObtenerCartasFiguras(id_partida, jugadoresPartida.id_jugador)
                nombres.push(jugadoresPartida.nombre)
                const cartas = data.map((carta) =>
                    imageCartaFigura(carta.figura, carta.revelada)
                );
                cartaslist.push(cartas)
            }
            setCartasFiguras(cartaslist);
            setNombresJugadores(nombres);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div className="flex flex-row gap-4">
            {cartasFiguras.map((cartasJugador, indexJugador) => (
                <div key={indexJugador} className="flex flex-col items-center">
                    <h3 className="text-center font-bold mb-2">Cartas de: {nombresJugadores[indexJugador]}</h3> {/* Mostrar el nombre */}
                    <div className="flex flex-row">
                        {cartasJugador.map((carta, indexCarta) => (
                            <div key={`${indexJugador}-${indexCarta}-carta-figura`} className="w-24 h-32 m-2">
                                <Cartas
                                    imgSrc={carta.img}
                                    rotation={0}
                                    middle={false}
                                    altText={`Carta del jugador ${indexJugador + 1} - Carta ${indexCarta + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export {CartasDeLosJugadores}