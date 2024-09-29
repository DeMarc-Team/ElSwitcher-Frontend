import { useState, useEffect } from "react";
import { imageCartaMovimiento, type CartaMovimiento } from "./img_cartas_movimiento";
import { ObtenerCartasMovimientos } from "@/services/api/obtener_carta_movimiento";
import Cartas from "./Cartas";
const Rotation = (cartasMovimiento: CartaMovimiento[], index: number) => {
    if (cartasMovimiento.length === 3) {
        return index === 0 ? -5 : index === 1 ? 0 : 5;
    } else if (cartasMovimiento.length === 2) {
        return index === 0 ? -5 : 5;
    } else {
        return 0;
    }
};

const CartasMovimiento = ({
    id_partida,
    id_jugador,
}: {
    id_partida: number;
    id_jugador: number;
}) => {
    const [cartasMovimiento, setCartasMovimiento] = useState<CartaMovimiento[]>([]);

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const data = await ObtenerCartasMovimientos(id_partida, id_jugador);
            const cartas = data.map((carta) => imageCartaMovimiento(carta.movimiento));
            setCartasMovimiento(cartas);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div className="flex flex-row gap-1">
          {cartasMovimiento.map((carta, index) => {
            const rotation = Rotation(cartasMovimiento, index);

            return (
              <Cartas
                key={index + "-carta-figura"}
                imgSrc={carta.img}
                rotation={rotation}
                altText={`Carta ${index + 1}`}
              />
            );
          })}
        </div>
    );
};

export default CartasMovimiento;
