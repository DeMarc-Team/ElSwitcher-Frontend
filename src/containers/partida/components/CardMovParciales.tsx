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
import { ObtenerCartasMovimientos } from "@/services/api/obtener_carta_movimiento";
import { useEffect, useState } from "react";
import { usePartida } from "@/context/PartidaContext";
import { Button } from "@/components/ui/button";
import { CancelarMovParcial } from "@/services/api/cancelar_mov_parcial";
import { useNotification } from "@/hooks/useNotification";

const CardMovParciales = () => {
    const { jugador, partida } = usePartida();
    const { showToastInfo, closeToast } = useNotification();
    const [cartasMovParciales, setCartasMovParciales] = useState<
        CartaMovimiento[]
    >([]);

    useEffect(() => {
        fetchCartasMovimiento();
        console.log(cartasMovParciales);
    }, []);

    const fetchCartasMovimiento = async () => {
        if (!jugador || !partida) return;
        try {
            const data = await ObtenerCartasMovimientos(partida.id, jugador.id);
            // TODO: ACA DEBERIAMOS AGREGAR LAS CARTAS QUE SON PARCIALMENTE USADAS NOMAS
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
            // TODO: terminar de integrar esto:
            // await CancelarMovParcial(partida.id, jugador.id);
            showToastInfo("Se deshizo la última jugada.");
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
            <CardContent className="pb-0 pt-2">
                <CardDescription />
                <div className="flex h-20 w-full items-center justify-center">
                    {cartasMovParciales.length > 0 ? (
                        <div className="flex w-full justify-between">
                            {cartasMovParciales.map((carta, index) => {
                                return (
                                    <img
                                        key={index + "-carta-movimiento"}
                                        src={carta.img}
                                        alt={`Carta ${index + 1}`}
                                        className="h-20 rounded-md border border-black"
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <span className="text-center text-gray-500">
                            No hay movimientos parciales.
                        </span>
                    )}
                </div>
                <Button
                    className="mt-2 w-full border-2 border-black bg-white"
                    variant="outline"
                    onClick={handleCancelarMovParcial}
                >
                    Deshacer última jugada
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardMovParciales;
