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
        idJugadorABloquear,
        setEstoyBloqueando,
        setIdJugadorABloquear,
        setCodigoCartaFigura,
        setCartaFiguraSeleccionada,
        cleanFiguraContexto,
    } = useFiguraContext();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { showToastInfo, showToastAlert, closeToast } = useNotification();
    const [hayUnaCartaBloqueada, setHayUnaCartaBloqueada] = useState(false);
    const [tengoMasDeUnaCarta, setTengoMasDeUnaCarta] = useState(false);

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
            checkPuedoBloquearAlgunaCarta(cartas);
        } catch (error) {
            console.error("Error fetching cartas de figura:", error);
        }
    };

    const checkPuedoBloquearAlgunaCarta = (cartas: CartaFigura[]) => {
        let hayMasDeUnaCarta = cartas.length > 1;
        let hayAlgunaCartaBloqueada = cartas.some((carta) => carta.bloqueada);
        setTengoMasDeUnaCarta(hayMasDeUnaCarta);
        setHayUnaCartaBloqueada(hayAlgunaCartaBloqueada);
    };

    const seleccionarCartaABloquear = (
        codigo: string,
        index: number,
        bloqueada: boolean
    ) => {
        if (turno_actual?.id == miSession?.id) {
            if (!tengoMasDeUnaCarta) {
                showToastAlert(
                    "No puedes bloquearle su única carta a este jugador."
                );
            } else if (hayUnaCartaBloqueada) {
                showToastAlert(
                    "Cada jugador solo puede tener una carta bloqueada."
                );
            } else if (bloqueada) {
                showToastAlert("La carta está bloqueada.");
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
            showToastAlert("Espera tu turno para jugar");
        }
        setTimeout(() => {
            closeToast();
        }, 2000);
    };

    return (
        <div className="flex flex-row items-center justify-center gap-2 rounded-md border-2 border-black bg-yellow-100">
            <div className="ml-3 flex min-w-[204px] flex-row items-center justify-center gap-2">
                {cartasFiguras.length > 0 ? (
                    cartasFiguras.map((carta, indexCarta) => (
                        <div
                            key={`${id_jugador}-${indexCarta}-carta-figura`}
                            className="flex w-[68px] justify-center"
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
                                    idJugadorABloquear === id_jugador &&
                                    cartaFiguraSeleccionada === indexCarta &&
                                    estoyBloqueando &&
                                    tengoMasDeUnaCarta &&
                                    !hayUnaCartaBloqueada
                                }
                                automatic_tam={false}
                            />
                        </div>
                    ))
                ) : (
                    <p className="flex w-[204px] items-center justify-center text-nowrap text-center font-semibold opacity-80">
                        Jugador sin cartas
                    </p>
                )}
            </div>
            <div className="m-3 flex h-24 w-auto min-w-[144px] items-center justify-center rounded-md border-2 border-black bg-white px-1">
                <p
                    className={`break-words text-center text-xl font-semibold ${
                        nombre_jugador.length > 30
                            ? "overflow-hidden text-ellipsis whitespace-nowrap !text-sm"
                            : ""
                    }`}
                >
                    {nombre_jugador}
                </p>
            </div>
        </div>
    );
};

export default CartasDeJugador;
