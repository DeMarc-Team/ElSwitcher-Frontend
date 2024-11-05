import React, { useEffect, useState } from "react";
import { usePartida } from "@/context/PartidaContext";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { useEffectSkipFirst } from "@/hooks/useEffectSkipFirst";
import { Cronometro_, CronometroResponse } from "@/services/api/cronometro";

interface DashboardProps {
    id_partida: number;
}
const Cronometro: React.FC<DashboardProps> = ({ id_partida }) => {
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const { turno_actual } = usePartida();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { cleanFiguraContexto } = useFiguraContext();
    const { triggerSincronizarTurno } = useInsidePartidaWebSocket();
    const [sincronizarTurnoData, setSincronizarTurnoData2] =
        useState<CronometroResponse | null>(null);

    const fetchCronometro = async () => {
        try {
            const data = await Cronometro_(id_partida);
            if (data) {
                setSincronizarTurnoData2(data);
            }
        } catch (error) {
            console.error("Error al obtener datos del cronometro:", error);
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

        const calcularTiempoRestante = () => {
            if (
                sincronizarTurnoData?.inicio &&
                sincronizarTurnoData?.duracion
            ) {
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

    return (
        <div className="flex h-16 w-60 flex-col items-center justify-center rounded-lg bg-blue-500 p-3 text-white shadow-lg">
            {tiempoRestante > 0 ? (
                <>
                    <p className="text-xl">
                        {turno_actual?.nombre} te quedan:{" "}
                    </p>
                    <p className="text-xl">{tiempoRestante} segundos</p>
                </>
            ) : (
                <p className="mt-2 font-semibold text-red-300">
                    ¡Tiempo terminado!
                </p>
            )}
        </div>
    );
};

export { Cronometro };
