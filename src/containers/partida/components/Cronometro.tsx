import React, { useEffect, useState } from "react";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { useEffectSkipFirst } from "@/hooks/useEffectSkipFirst";
import {
    ObtenerTiempoCronometro,
    CronometroResponse,
} from "@/services/api/obtener_tiempo_cronometro";

interface DashboardProps {
    id_partida: number;
}
const Cronometro: React.FC<DashboardProps> = ({ id_partida }) => {
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { cleanFiguraContexto } = useFiguraContext();
    const { triggerSincronizarTurno } = useInsidePartidaWebSocket();
    const [sincronizarTurnoData, setSincronizarTurnoData] =
        useState<CronometroResponse | null>(null);

    const fetchCronometro = async () => {
        try {
            const data = await ObtenerTiempoCronometro(id_partida);
            if (data) {
                setSincronizarTurnoData(data);
            }
        } catch (error) {
            console.error("Error al obtener datos del cronometro:", error);
        }
    };

    const calcularTiempoRestante = () => {
        if (sincronizarTurnoData?.inicio && sincronizarTurnoData?.duracion) {
            const inicioDate = new Date(sincronizarTurnoData.inicio);
            const ahora = new Date();
            const tiempoFinal = new Date(
                inicioDate.getTime() + sincronizarTurnoData.duracion * 1000
            );
            const diferencia = tiempoFinal.getTime() - ahora.getTime();

            const nuevoTiempoRestante = Math.max(
                0,
                Math.floor(diferencia / 1000)
            );
            setTiempoRestante(nuevoTiempoRestante);
        }
    };

    useEffect(() => {
        fetchCronometro();
    }, [triggerSincronizarTurno]);

    useEffectSkipFirst(() => {
        if (
            sincronizarTurnoData?.inicio === undefined ||
            sincronizarTurnoData?.duracion === undefined
        ) {
            console.error("Inicio o duración no son válidos");
            return;
        }

        calcularTiempoRestante();

        const intervalId = setInterval(calcularTiempoRestante, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [sincronizarTurnoData]);

    useEffectSkipFirst(() => {
        if (tiempoRestante === 0) {
            cleanMovimientoContexto();
            cleanFiguraContexto();
        }
    }, [tiempoRestante]);

    const obtenerColorCronometro = () => {
        if (tiempoRestante > 60) {
            return "bg-blue-400";
        } else if (tiempoRestante > 30) {
            return "bg-yellow-400";
        } else if (tiempoRestante > 10) {
            return "bg-orange-400";
        } else {
            return "bg-red-500";
        }
    };

    return (
        <div
            data-testid="cronometro"
            className={`${obtenerColorCronometro()} transition-color flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-black py-1 shadow-lg duration-75`}
        >
            {tiempoRestante > 0 ? (
                <p className="font-bold">{tiempoRestante} seg</p>
            ) : (
                <p className="font-semibold">¡Tiempo terminado!</p>
            )}
        </div>
    );
};

export { Cronometro };
