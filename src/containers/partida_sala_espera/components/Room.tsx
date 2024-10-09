import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";
import {
    ObtenerInfoPartida,
    type Jugador,
} from "@/services/api/obtener_info_partida";
import { IniciarPartida } from "@/services/api/iniciar_partida";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { LoadSessionJugador } from "@/services/session_browser";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";

interface CardHomeProps {
    title: string;
    description: string;
    id_partida: number;
}

const Room: React.FC<CardHomeProps> = ({ title, description, id_partida }) => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [nombrePartida, setNombrePartida] = useState<string>("");
    const [cantidadDeJugadores, setcantidadDeJugadores] = useState<number>(0);
    const [idCreador, setIdCreador] = useState<number>(0);
    const [partidaIniciada, setPartidaIniciada] = useState<boolean>(false);
    const session_jugador = LoadSessionJugador();
    const { showToastAlert, showToastSuccess, closeToast } = useNotification();
    const { triggerActualizarSalaEspera, openConnectionToPartida } =
        useInsidePartidaWebSocket();

    const navigate = useNavigate();

    useEffect(() => {
        if (!session_jugador) {
            navigate("/");
        } else {
            openConnectionToPartida(
                id_partida.toString(),
                session_jugador.id.toString()
            );
        }
    }, []);

    useEffect(() => {
        info_partida();
    }, [triggerActualizarSalaEspera]);

    useEffect(() => {
        if (partidaIniciada) {
            redirectPartida();
        }
    }, [partidaIniciada]);

    const info_partida = async () => {
        try {
            const info_partida = await ObtenerInfoPartida(id_partida);
            setJugadores(info_partida.jugadores);
            setNombrePartida(info_partida.nombre_partida);
            setcantidadDeJugadores(info_partida.cantidad_jugadores);
            setIdCreador(info_partida.id_creador);
            setPartidaIniciada(info_partida.iniciada);
        } catch (error) {
            console.error("Error obteniendo info de la partida:", error);
            throw error;
        }
    };

    async function start_play(partida_a_iniciar: number) {
        if (cantidadDeJugadores <= 1) {
            showToastAlert("Se necesita por lo menos dos jugadores.");
        } else {
            try {
                showToastSuccess("Iniciando la partida.");
                setTimeout(async () => {
                    await IniciarPartida(partida_a_iniciar);
                    closeToast();
                    redirectPartida();
                }, 1000);
            } catch (error) {
                showToastAlert("La partida ya esta iniciada.");
            }
        }

        setTimeout(() => {
            closeToast();
        }, 2000);
    }
    const redirectPartida = () => {
        navigate(`/partidas/${id_partida}`);
    };

    if (!nombrePartida) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <Card className="w-96 text-center">
                <CardHeader>
                    <CardTitle>
                        <span>{title}</span>
                        <br />
                        <span>{nombrePartida}</span>
                    </CardTitle>

                    {jugadores.length < 4 && (
                        <>
                            <Loading />
                            <CardDescription className="mt-2 h-fit">
                                <span>{description}</span>
                            </CardDescription>
                        </>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border-2 border-black bg-green-300">
                            <thead>
                                <tr>
                                    <th className="border border-b-2 border-black px-4 py-4">
                                        Jugadores
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jugadores.length === 0 ? (
                                    <tr key={0}>
                                        <td className="border border-black px-4 py-2">
                                            No hay jugadores en la sala.
                                        </td>
                                    </tr>
                                ) : (
                                    jugadores.map((jugador) => (
                                        <tr key={jugador.id_jugador}>
                                            <td className="border border-black px-4 py-2">
                                                {jugador.nombre}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {jugadores.length >= 4 && (
                        <div className="mt-4 gap-10 opacity-65">
                            Se completó la cantidad de jugadores.
                        </div>
                    )}
                    {session_jugador?.id == idCreador && (
                        <Button
                            onClick={() => {
                                start_play(id_partida);
                            }}
                            className="mt-4 gap-10"
                        >
                            Iniciar partida
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Room;
