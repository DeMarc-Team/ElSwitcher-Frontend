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
import { Jugadores, type Players } from "./Player"; // Asegúrate de usar la ruta correcta

interface CardHomeProps {
    title: string;
    description: string;
}

const Room: React.FC<CardHomeProps> = ({ title, description }) => {
    const [jugadores, setJugadores] = useState<Players[]>([]);

    useEffect(() => {
        const fetchJugadores = async () => {
            try {
                const data = await Jugadores();
                setJugadores(data);
            } catch (error) {
                console.error("Error fetching jugadores:", error);
            } finally {
            }
        };

        fetchJugadores();
    }, []);
    return (
                <p>
        <Card className="w-96 text-center">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                {jugadores.length < 4 ? <Loading></Loading> : <p></p> }
            </CardHeader>
            <CardContent>
                {jugadores.length === 0 ? (
                    <p>No hay jugadores en la sala.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border-2 border-black bg-green-300">
                            <thead>
                                <tr>
                                    <th className="border border-black px-4 py-2">Jugador ID</th>
                                    <th className="border border-black px-4 py-2">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jugadores.map((jugador) => (
                                    <tr key={jugador.id_jugador}>
                                        <td className="border border-black px-4 py-2">{jugador.id_jugador}</td>
                                        <td className="border border-black px-4 py-2">{jugador.nombre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {jugadores.length === 4 ? <div className="gap-10 mt-4">Se completó la cantidad de jugadores</div> : <p></p> }
                <Button className="gap-10 mt-4">Iniciar partida</Button>
            </CardContent>
        </Card>
                </p>
            );
        };

export default Room;