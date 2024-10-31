import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";
import { usePartida } from "@/context/PartidaContext";
import { LoadSessionJugador } from "@/services/session_browser";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useNotification } from "@/hooks/useNotification";

const CartasDeJugador = ({
    id_partida,
    id_jugador,
    nombre_jugador,
}: {
    id_partida: number;
    id_jugador: number;
    nombre_jugador: string;
}) => {
    const { triggerActualizarCartasFigura, triggerActualizarTurno } =
        useInsidePartidaWebSocket();
    const [cartasFiguras, setCartasFiguras] = useState<CartaFigura[]>([]);
    const { turno_actual } = usePartida();
    const miSession = LoadSessionJugador();
    const {
        existeFigura,
        cartaFiguraSeleccionada,
        estoyBloqueando,
        setEstoyBloqueando,
        setIdJugadorABloquear,
        setCodigoCartaFigura,
        setCartaFiguraSeleccionada,
        cleanFiguraContexto,
    } = useFiguraContext();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { showToastInfo, showToastError, closeToast } = useNotification();

    useEffect(() => {
        fetchCartasFigurasOtrosJugadores();
    }, [triggerActualizarCartasFigura, triggerActualizarTurno]);

    const fetchCartasFigurasOtrosJugadores = async () => {
        try {
            const data = await ObtenerCartasFiguras(id_partida, id_jugador);
            const cartas = data.map((carta) =>
                imageCartaFigura(carta.figura, carta.bloqueada)
            );
            setCartasFiguras(cartas);
        } catch (error) {
            console.error("Error fetching cartas de figura:", error);
        }
    };

    const seleccionarCartaABloquear = (
        codigo: string,
        index: number,
        bloqueada: boolean
    ) => {
        if (turno_actual?.id == miSession?.id) {
            if (bloqueada) {
                showToastInfo("La carta esta bloqueada.", true);
            } else if (existeFigura?.includes(codigo)) {
                setCodigoCartaFigura(codigo);
                setCartaFiguraSeleccionada(index);
                setEstoyBloqueando(true);
                setIdJugadorABloquear(id_jugador);
                showToastInfo(
                    "Marca una figura en el tablero para bloquear la carta.",
                    true
                );
            } else {
                showToastInfo(
                    "La carta no coincide con alguna figura del tablero.",
                    true
                );
                cleanFiguraContexto();
            }
        } else {
            showToastError("Espera tu turno para jugar");
        }
        setTimeout(() => {
            closeToast();
        }, 2000);
    };

    return (
        <div
            className={`flex flex-row justify-center gap-1 rounded-md border-2 border-black bg-yellow-100 px-2 pt-2`}
        >
            <div className="flex min-w-[204px] justify-center gap-2">
                {cartasFiguras.map((carta, indexCarta) => (
                    <div
                        key={`${id_jugador}-${indexCarta}-carta-figura`}
                        className="w-[68px]"
                    >
                        <Cartas
                            imgSrc={carta.img}
                            rotation={0}
                            middle={false}
                            altText={`Carta del jugador ${id_jugador + 1} - Carta ${indexCarta + 1}`}
                            onClick={() => {
                                cleanMovimientoContexto();
                                seleccionarCartaABloquear(
                                    carta.code,
                                    indexCarta,
                                    carta.bloqueada ?? false
                                );
                            }}
                            isSelect={
                                cartaFiguraSeleccionada === indexCarta &&
                                estoyBloqueando
                            }
                            automatic_tam={false}
                        />
                    </div>
                ))}
            </div>
            <div className="flex h-24 w-36 items-center justify-center rounded-md border-2 border-black bg-white px-1">
                <p
                    className={`break-words text-center font-semibold ${nombre_jugador.length > 30 ? "!break-all text-sm" : "text-xl"}`}
                >
                    {nombre_jugador}
                </p>
            </div>
        </div>
    );
};

export default CartasDeJugador;
