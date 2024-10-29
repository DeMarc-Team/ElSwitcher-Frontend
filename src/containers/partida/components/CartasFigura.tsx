import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";
import { useNotification } from "@/hooks/useNotification";
import { usePartida } from "@/context/PartidaContext";
import { LoadSessionJugador } from "@/services/session_browser";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";
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
        setCodigoCartaFigura,
        existeFigura,
        setCartaFiguraSeleccionada,
        cartaFiguraSeleccionada,
        setEstoyBloqueando,
        estoyBloqueando,
    } = useFiguraContext();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { triggerActualizarCartasFigura, triggerActualizarTurno } =
        useInsidePartidaWebSocket();

    useEffect(() => {
        fetchCartasFigura();
    }, [triggerActualizarCartasFigura, triggerActualizarTurno]);

    const fetchCartasFigura = async () => {
        try {
            const data = await ObtenerCartasFiguras(id_partida, id_jugador);
            console.log(data);
            const cartas = data.map((carta) =>
                imageCartaFigura(carta.figura, carta.revelada)
            );
            setCartasFiguras(cartas);
        } catch (error) {
            console.error("Error fetching cartas figuras:", error);
        }
    };

    const seleccionarCarta = (
        codigo: string,
        index: number,
        revelada: boolean
    ) => {
        if (turno_actual?.id == miSession?.id) {
            if (!revelada) {
                showToastInfo("La carta está bloqueada.", true);
                setTimeout(() => {
                    closeToast();
                }, 2000);
                return;
            }
            if (existeFigura?.includes(codigo)) {
                setCodigoCartaFigura(codigo);
                setCartaFiguraSeleccionada(index);
                setEstoyBloqueando(false);
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
                            seleccionarCarta(
                                carta.code,
                                index,
                                carta.revelada ?? false
                            );
                        }}
                        isSelect={
                            cartaFiguraSeleccionada === index &&
                            !estoyBloqueando
                        }
                    />
                );
            })}
        </div>
    );
};

export default CartasFigura;
