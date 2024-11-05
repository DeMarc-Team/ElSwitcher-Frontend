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
    // const [inicioLocal, setInicioLocal] = useState<string | undefined>("");
    const { turno_actual /*setFinalizoTurno*/, partida } = usePartida();
    const { cleanMovimientoContexto } = useMovimientoContext();
    const { cleanFiguraContexto } = useFiguraContext();
    const { triggerSincronizarTurno, sincronizarTurnoData } =
        useInsidePartidaWebSocket();
    const [sincronizarTurnoData2, setSincronizarTurnoData2] =
        useState<CronometroResponse | null>(null);

    const fetchCronometro = async () => {
        try {
            const data = await Cronometro_(id_partida);
            if (data) {
                setSincronizarTurnoData2(data);
            }
        } catch (error) {
            console.error("Error al obtener el tablero:", error);
        }
    };

    useEffect(() => {
        fetchCronometro();
    }, [triggerSincronizarTurno]);

    useEffectSkipFirst(() => {
        if (
            sincronizarTurnoData2?.inicio === undefined ||
            sincronizarTurnoData2?.duracion === undefined
        ) {
            console.error("Inicio o duración no son válidos");
            return;
        }

        const calcularTiempoRestante = () => {
            if (
                sincronizarTurnoData2?.inicio &&
                sincronizarTurnoData2?.duracion
            ) {
                const inicioDate = new Date(sincronizarTurnoData2.inicio);
                const ahora = new Date();
                const tiempoFinal = new Date(
                    inicioDate.getTime() + sincronizarTurnoData2.duracion * 1000
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
    }, [triggerSincronizarTurno]);

    // Efecto para actualizar inicio al recibir el trigger de sincronizar turno
    /*useEffect(() => {
        if (triggerSincronizarTurno) {
            const ahoraGMT = new Date().toISOString(); // Obtiene la hora actual en formato GMT
            //setInicioLocal(ahoraGMT); // Actualiza el estado local de inicio
        }
    }, [triggerSincronizarTurno]);*/

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
