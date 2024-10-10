import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";

const Rotation = (cartasFiguras: CartaFigura[], index: number) => {
    if (cartasFiguras.length === 3) {
        return index === 0 ? -5 : index === 1 ? 0 : 5;
    } else if (cartasFiguras.length === 2) {
        return index === 0 ? -5 : 5;
    } else {
        return 0;
    }
};

const isMiddleCard = (cartasFiguras: CartaFigura[], index: number) => {
    return cartasFiguras.length === 3 && index === 1;
};

const CartasFigura = ({
    id_partida,
    id_jugador,
}: {
    id_partida: number;
    id_jugador: number;
}) => {
    const [cartasFiguras, setCartasFiguras] = useState<CartaFigura[]>([]);

    useEffect(() => {
        fetchCartasFigura();
    }, []);

    const fetchCartasFigura = async () => {
        try {
            const data = await ObtenerCartasFiguras(id_partida, id_jugador);
            const cartas = data.map((carta) =>
                imageCartaFigura(carta.figura, carta.revelada)
            );
            setCartasFiguras(cartas);
        } catch (error) {
            console.error("Error fetching cartas figuras:", error);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            {cartasFiguras.map((carta, index) => {
                return (
                    <Cartas
                        key={index + "-carta-figura"}
                        imgSrc={carta.img}
                        rotation={Rotation(cartasFiguras, index)}
                        middle={isMiddleCard(cartasFiguras, index)}
                        altText={`Carta ${index + 1}`}
                        onClick={()=>{}}
                    />
                );
            })}
        </div>
    );
};

export default CartasFigura;
