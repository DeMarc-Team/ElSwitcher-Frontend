import {
    Card,
    CardContent,
    CardHeader,
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
        <Card className="h-fit w-fit border-2 border-black bg-yellow-100 p-4">
            <CardHeader className="p-0 uppercase">
                <CardTitle>Historial de jugadas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center pb-0 pt-2">
                <CardDescription />
                {turno_actual && jugador.id === turno_actual.id ? (
                    <>
                        <div className="flex h-20 w-full items-center justify-center">
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
                        {cartasMovParciales.length > 0 && (
                            <Button
                                className="mt-2 w-full border-2 border-black bg-white"
                                variant="outline"
                                onClick={handleCancelarMovParcial}
                            >
                                Deshacer última jugada
                            </Button>
                        )}
                    </>
                ) : (
                    <div className="flex h-20 items-center justify-center">
                        <span className="text-center text-gray-500">
                            No es tú turno.
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CardMovParciales;
