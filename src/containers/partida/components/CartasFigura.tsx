import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";
import { useNotification } from "@/hooks/useNotification";
import { usePartida } from "@/context/PartidaContext";
import { LoadSessionJugador } from "@/services/session_browser";
import { useFiguraContext } from "@/context/FigurasContext";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";

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
    const { showToastInfo, showToastError, closeToast } = useNotification();
    const { turno_actual } = usePartida();
    const miSession = LoadSessionJugador();
    const {
        setCartaFSeleccionada,
        existeFigura,
        setCartaFiguraIndexSeleccionada,
        cartaFiguraIndexSeleccionada,
    } = useFiguraContext();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { triggerActualizarCartasFiguras, triggerActualizarTurno } = useInsidePartidaWebSocket();

    useEffect(() => {
        fetchCartasFigura();
    }, [triggerActualizarCartasFiguras, triggerActualizarTurno]);

    const fetchCartasFigura = async () => {
        try {
            const data = await ObtenerCartasFiguras(id_partida, id_jugador);
            const cartas = data.map((carta) => imageCartaFigura(carta.figura));
            setCartasFiguras(cartas);
        } catch (error) {
            console.error("Error fetching cartas figuras:", error);
        }
    };

    const seleccionarCarta = (codigo: string, index: number) => {
        if (turno_actual?.id == miSession?.id) {
            if (existeFigura?.includes(codigo)) {
                setCartaFSeleccionada(codigo);
                setCartaFiguraIndexSeleccionada(index);
            } else {
                showToastInfo(
                    "Tú carta no coincide con alguna figura del tablero.",
                    true
                );
                setTimeout(() => {
                    closeToast();
                }, 2000);
            }
        } else {
            showToastError("Espera tu turno para jugar");
            setTimeout(() => {
                closeToast();
            }, 2000);
        }
    };

    //Los estados que debo de limpiar al cambiar de turno
    useEffect(() => {
        setCartaFSeleccionada(undefined);
    }, [turno_actual]);

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
                        onClick={() => {
                            cleanMovimientoContexto();
                            seleccionarCarta(carta.code, index);
                        }}
                        isSelect={cartaFiguraIndexSeleccionada === index}
                    />
                );
            })}
        </div>
    );
};

export default CartasFigura;
