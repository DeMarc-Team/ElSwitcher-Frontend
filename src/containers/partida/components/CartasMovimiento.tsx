import { useState, useEffect } from "react";
import {
    imageCartaMovimiento,
    type CartaMovimiento,
} from "./img_cartas_movimiento";
import { ObtenerCartasMovimientos } from "@/services/api/obtener_carta_movimiento";

const CartasMovimiento = ({
    id_partida,
    id_jugador,
}: {
    id_partida: number;
    id_jugador: number;
}) => {
    const [cartasMovimiento, setCartasMovimiento] = useState<CartaMovimiento[]>(
        []
    );

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const data = await ObtenerCartasMovimientos(id_partida, id_jugador);
            const cartas = data.map((carta) =>
                imageCartaMovimiento(carta.movimiento)
            );
            setCartasMovimiento(cartas);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div className="flex flex-row gap-3">
            {cartasMovimiento.map((carta, index) => (
                <img
                    key={index + "-carta-movimiento"}
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

export default CartasMovimiento;
