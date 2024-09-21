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

interface CardHomeProps {
    title: string;
    description: string;
    id_partida: number;
}

const Room: React.FC<CardHomeProps> = ({ title, description, id_partida }) => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [nombrePartida, setNombrePartida] = useState<string>("");

    useEffect(() => {
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
        } catch (error) {
            console.error("Error obteniendo info de la partida:", error);
            throw error;
        }
    };
    if (!nombrePartida) {
        return <Loading></Loading>;
    }
    return (
        <p>
            <Card className="w-96 text-center">
                <CardHeader>
                    <CardTitle>
                        <span>{title}</span>
                        <br />
                        <span>{nombrePartida}</span>
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
                    <Button className="mt-4 gap-10">Iniciar partida</Button>
                </CardContent>
            </Card>
        </p>
    );
};

export default Room;
