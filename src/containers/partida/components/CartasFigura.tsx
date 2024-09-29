import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";

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
        <div className="flex flex-row gap-3">
            {cartasFiguras.map((carta, index) => (
                <img
                    key={index + "-carta-figura"}
                    src={carta.img}
                    style={{
                        width: "150px",
                        height: "auto",
                    }}
                    className="rounded-lg border-2 border-black shadow-md transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                    alt={`Carta ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default CartasFigura;
