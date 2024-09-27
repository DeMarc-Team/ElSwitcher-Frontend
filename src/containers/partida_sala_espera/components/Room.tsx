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
import { useLocation } from "react-router-dom";

interface CardHomeProps {
    title: string;
    description: string;
    id_partida: number;
}

const Room: React.FC<CardHomeProps> = ({ title, description, id_partida }) => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [nombrePartida, setNombrePartida] = useState<string>("");
    const [cantidadDeJugadores, setcantidadDeJugadores] = useState<Number>();
    const [nombreCreador, setNombreCreador] = useState<string>("");
    const { showToastAlert, showToastSuccess, closeToast } = useNotification();

    //Con esto obtengo el estado del navigate del Home
    const location = useLocation();
    const quienCreo = location.state?.nombre_creador

    useEffect(() => {
        info_partida();
        const intervalId = setInterval(() => {
            info_partida();
        }, 2000); // Son ms
        return () => clearInterval(intervalId);
    }, []);

    const info_partida = async () => {
        try {
            const info_partida = await ObtenerInfoPartida(id_partida);
            setJugadores(info_partida.jugadores);
            setNombrePartida(info_partida.nombre_partida);
            setcantidadDeJugadores(info_partida.cantidad_jugadores)
            setNombreCreador(info_partida.nombre_creador)
        } catch (error) {
            console.error("Error obteniendo info de la partida:", error);
            throw error;
        }
    };
    if (!nombrePartida) {
        return <Loading></Loading>;
    }

    function start_play(partida_a_iniciar:number) {
        if (quienCreo != nombreCreador){
            showToastAlert("Solo quien creo la partida la puede iniciar");
        }
        else if(cantidadDeJugadores == 1){
            setTimeout(() => {
                showToastAlert("Se necesita por lo menos dos jugadores.");
            }, 2000);
            
        }
        else {
            IniciarPartida(partida_a_iniciar)
            showToastSuccess("Se inició la partida");
            closeToast();
            //Agregar la redireccion a la partida
        }
    }

    return (
        <p>
            <Card className="w-96 text-center">
                <CardHeader>
                    <CardTitle>
                        <span>{title}</span>
                        <br />
                        <span>"{nombrePartida}"</span>
                    </CardTitle>

                    {jugadores.length < 4 && (
                        <CardDescription className="h-fit">
                            <Loading></Loading>
                            <br />
                            <span>{description}</span>
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    {
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
                    }
                    {jugadores.length >= 4 && (
                        <div className="mt-4 gap-10 opacity-65">
                            Se completó la cantidad de jugadores.
                        </div>
                    )}
                        <Button onClick={() => {
                            start_play(id_partida);
                        }}
                        className="mt-4 gap-10">
                            Iniciar partida
                        </Button>
                </CardContent>
            </Card>
        </p>
    );
};

export default Room;
