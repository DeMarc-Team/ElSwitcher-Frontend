import { useState, useEffect} from "react";
import {
    imageCartaMovimiento,
    type CartaMovimiento,
} from "./img_cartas_movimiento";
import { ObtenerCartasMovimientos } from "@/services/api/obtener_carta_movimiento";
import Cartas from "./Cartas";
import { useFiguraContext } from "./FigurasContext";
import { useTurno } from "./turnoContext";
import { LoadSessionJugador } from "@/services/session_jugador";
import { useNotification } from "@/hooks/useNotification";

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

    const { showToastError, closeToast } = useNotification();
    const {turnoId} = useTurno();
    const miSession = LoadSessionJugador();
    const seleccionarCarta = (codigo: string) => {
        console.log('Turno ID:', turnoId);
        console.log('Mi sesión ID:', miSession.id);
    
        if (turnoId == miSession.id) {
            console.log('Seleccionando carta:', codigo);
            setCartaFSeleccionada(codigo);
        } else {
            showToastError("Espera tu turno para jugar");
            setTimeout(() => {
                closeToast();
            }, 2000);
        }
    };

    const{setCartaFSeleccionada} = useFiguraContext();
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
                        onClick={()=>seleccionarCarta(carta.code)}
                    />
                );
            })}
        </div>
    );
};

export default CartasMovimiento;
