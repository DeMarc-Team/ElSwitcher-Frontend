import { useState, useEffect } from "react";
import {
    imageCartaMovimiento,
    type CartaMovimiento,
} from "./img_cartas_movimiento";
import { ObtenerCartasMovimientos } from "@/services/api/obtener_carta_movimiento";
import Cartas from "./Cartas";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { usePartida } from "@/context/PartidaContext";

const Rotation = (cartasMovimiento: CartaMovimiento[], index: number) => {
    if (cartasMovimiento.length === 3) {
        return index === 0 ? -5 : index === 1 ? 0 : 5;
    } else if (cartasMovimiento.length === 2) {
        return index === 0 ? -5 : 5;
    } else {
        return 0;
    }
};

const isMiddleCard = (cartasFiguras: CartaMovimiento[], index: number) => {
    return cartasFiguras.length === 3 && index === 1;
};

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
    const {
        setCartaSeleccionada,
        setCodigoCartaMovimiento,
        setParcialmenteUsada,
        setRotVec,
    } = useMovimientoContext();
    const { turno_actual, jugador } = usePartida();

    const cartaCodigoMovimiento = (index: number, code: string) => {
        if (turno_actual?.id == jugador?.id) {
            setCartaSeleccionada(index);
            setCodigoCartaMovimiento(code);
            setParcialmenteUsada(cartasMovimiento[index].parcialmente_usada);
            setRotVec(cartasMovimiento[index].rot_vec);
        }
    };

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

            if (data.length > 0) {
                setParcialmenteUsada(data[0].parcialmente_usada);
            }
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            {cartasMovimiento.map((carta, index) => {
                return (
                    <Cartas
                        key={index + "-carta-figura"}
                        imgSrc={carta.img}
                        rotation={Rotation(cartasMovimiento, index)}
                        middle={isMiddleCard(cartasMovimiento, index)}
                        altText={`Carta ${index + 1}`}
                        onClick={() => {
                            cartaCodigoMovimiento(index, carta.code);
                        }}
                    />
                );
            })}
        </div>
    );
};

export default CartasMovimiento;
