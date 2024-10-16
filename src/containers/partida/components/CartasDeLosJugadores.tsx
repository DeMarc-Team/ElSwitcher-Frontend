import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const CartasDeLosJugadores = ({
    id_partida,
    id_jugador,
}: {
    id_partida: number;
    id_jugador: number;
}) => {
    const [cartasFiguras, setCartasFiguras] = useState<CartaFigura[][]>([]);
    const [nombresJugadores, setNombresJugadores] = useState<string[]>([]);

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const jugadores = (await ObtenerInfoPartida(id_partida)).jugadores;
            const jugadoresFiltrados = jugadores.filter(
                (jugador) => jugador.id_jugador !== id_jugador
            );
            let cartaslist: CartaFigura[][] = [];
            let nombres: string[] = [];
            for (const jugadoresPartida of jugadoresFiltrados) {
                const data = await ObtenerCartasFiguras(
                    id_partida,
                    jugadoresPartida.id_jugador
                );
                nombres.push(jugadoresPartida.nombre);
                const cartas = data.map((carta) =>
                    imageCartaFigura(carta.figura, carta.revelada)
                );
                cartaslist.push(cartas);
            }
            setCartasFiguras(cartaslist);
            setNombresJugadores(nombres);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <Accordion type="single" collapsible>
            <h3 className="flex justify-center font-extrabold">
                Cartas de otros jugadores
            </h3>
            {cartasFiguras.map((cartasJugador, indexJugador) => (
                <div key={indexJugador}>
                    <AccordionItem value={`item-${indexJugador}`}>
                        <AccordionTrigger className="px-10 py-1 text-sm">
                            Cartas de {nombresJugadores[indexJugador]}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-row justify-center">
                                {cartasJugador.map((carta, indexCarta) => (
                                    <div
                                        key={`${indexJugador}-${indexCarta}-carta-figura`}
                                        className="m-2 h-full w-20"
                                    >
                                        <Cartas
                                            imgSrc={carta.img}
                                            rotation={0}
                                            middle={false}
                                            altText={`Carta del jugador ${indexJugador + 1} - Carta ${indexCarta + 1}`}
                                            isSelect={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </div>
            ))}
        </Accordion>
    );
};

export { CartasDeLosJugadores };

// return (
//     <Carousel className="ml-12 border-2 border-black">
//         <CarouselContent>
//             {cartasFiguras.map((cartasJugador, indexJugador) => (
//                 <CarouselItem key={indexJugador} className="bg-yellow-100">
//                     <h3 className="text-center text-lg font-bold">
//                         Cartas de {nombresJugadores[indexJugador]}
//                     </h3>
//                     <div className="flex flex-row">
//                         {cartasJugador.map((carta, indexCarta) => (
//                             <div
//                                 key={`${indexJugador}-${indexCarta}-carta-figura`}
//                                 className="m-2"
//                             >
//                                 <Cartas
//                                     imgSrc={carta.img}
//                                     rotation={0}
//                                     middle={false}
//                                     altText={`Carta del jugador ${indexJugador + 1} - Carta ${indexCarta + 1}`}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </CarouselItem>
//             ))}
//         </CarouselContent>
//         <CarouselPrevious className="bg-yellow-100" />
//         <CarouselNext className="bg-yellow-100" />
//     </Carousel>
// );
