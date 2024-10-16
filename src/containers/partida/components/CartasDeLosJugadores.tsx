import { useState, useEffect } from "react";
import { Jugador } from "@/models/types";
import { ObtenerInfoPartida } from "@/services/api/obtener_info_partida";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import CartasDeJugador from "./CartasDeJugador";

const CartasDeLosJugadores = () => {
    const { partida, jugador } = usePartida();
    const { triggerActualizarSalaEspera } = useInsidePartidaWebSocket();
    const [jugadores, setJugadores] = useState<Jugador[]>([]);

    useEffect(() => {
        fetchJugadores();
    }, [triggerActualizarSalaEspera]);

    const fetchJugadores = async () => {
        if (!partida || !jugador) return;
        try {
            const jugadores = (await ObtenerInfoPartida(partida?.id)).jugadores;
            const jugadoresFiltrados = jugadores.filter(
                (j) => j.id_jugador !== jugador.id
            );
            const parseJugadores = jugadoresFiltrados.map((j) => ({
                id: j.id_jugador,
                nombre: j.nombre,
            }));
            setJugadores(parseJugadores);
        } catch (error) {
            console.error("Error al obtener jugadores:", error);
        }
    };

    if (!partida || !jugador) return;

    return (
        <div className="flex flex-col gap-2">
            {jugadores.map((j) => (
                <CartasDeJugador
                    key={`cartas-jugador-${j.id}`}
                    id_partida={partida?.id}
                    id_jugador={j.id}
                    nombre_jugador={j.nombre}
                />
            ))}
        </div>
    );
};

export { CartasDeLosJugadores };
