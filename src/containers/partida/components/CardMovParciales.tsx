import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    imageCartaMovimiento,
    type CartaMovimiento,
} from "./img_cartas_movimiento";
import { useEffect, useState } from "react";
import { usePartida } from "@/context/PartidaContext";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/hooks/useNotification";
import { ObtenerCartasMovimientosParciales } from "@/services/api/obtener_mov_parciales";
import { CancelarMovParcial } from "@/services/api/cancelar_mov_parcial";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";

const CardMovParciales = () => {
    const { jugador, partida, turno_actual } = usePartida();
    const { triggerActualizarCartasMovimiento, triggerActualizarTurno } =
        useInsidePartidaWebSocket();
    const { showToastInfo, closeToast } = useNotification();
    const [cartasMovParciales, setCartasMovParciales] = useState<
        CartaMovimiento[]
    >([]);

    useEffect(() => {
        fetchCartasMovimiento();
    }, [triggerActualizarCartasMovimiento, triggerActualizarTurno]);

    const fetchCartasMovimiento = async () => {
        if (!jugador || !partida) return;
        try {
            const data = await ObtenerCartasMovimientosParciales(
                partida.id,
                jugador.id
            );
            if (!data) return; // Si no llega data, no hago nada.
            const cartas = data.map((carta) =>
                imageCartaMovimiento(carta.movimiento)
            );
            setCartasMovParciales(cartas);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    const handleCancelarMovParcial = async () => {
        if (cartasMovParciales.length === 0) return;
        if (!jugador || !partida) return;
        try {
            await CancelarMovParcial(partida.id, jugador.id);
            showToastInfo("Se deshizo la última jugada.", true);
            setTimeout(() => {
                closeToast();
            }, 1500);
        } catch (error) {
            console.error("Error cancelando movimiento parcial:", error);
        }
    };

    if (!jugador || !partida) return null;

    return (
        <Card className="w-full border-2 border-black bg-yellow-100 px-1 py-4">
            <CardContent className="flex flex-col justify-center pb-0">
                <CardDescription />
                <div className="flex items-center justify-center">
                    <CardTitle className="text-left uppercase"></CardTitle>
                    {turno_actual && jugador.id === turno_actual.id ? (
                        <div className="flex min-h-20 w-full items-center justify-center">
                            {cartasMovParciales.length > 0 ? (
                                <div className="flex w-full justify-center gap-3">
                                    {cartasMovParciales.map((carta, index) => {
                                        return (
                                            <img
                                                key={
                                                    index + "-carta-movimiento"
                                                }
                                                src={carta.img}
                                                alt={`Carta ${index + 1}`}
                                                className="h-20 rounded-md border border-black"
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <span className="text-center text-gray-500">
                                    Jugá alguna <br /> carta de movimiento.
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="flex h-20 w-full items-center justify-center">
                            <span className="text-center text-gray-500">
                                ...
                            </span>
                        </div>
                    )}{" "}
                </div>

                <Button
                    className="mt-2 w-full border-2 border-black bg-white transition-transform duration-75"
                    variant="outline"
                    onClick={handleCancelarMovParcial}
                    disabled={turno_actual && jugador.id !== turno_actual.id}
                >
                    Deshacer última jugada
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardMovParciales;
