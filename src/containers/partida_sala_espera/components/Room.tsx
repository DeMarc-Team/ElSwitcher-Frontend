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
import { useNavigate } from "react-router-dom";
import CronometroVisual from "../../dashboard/components/Cronometer";
import Cronometer from "../../dashboard/components/Cronometer";

interface CardHomeProps {
    title: string;
    description: string;
    id_partida: number;
}

const Room: React.FC<CardHomeProps> = ({ title, description, id_partida }) => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [nombrePartida, setNombrePartida] = useState<string>("");
    const [showMessage, setShowMessage] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const navigate = useNavigate();

    const handleRedirect = () => {
        setShowMessage(true); // Muestra el mensaje de bienvenida
        setIsRedirecting(true); // Indica que se está redirigiendo

        // Temporizador para redirigir después de 2 segundos
        /*setTimeout(() => {
            navigate('/partidas/dashboard'); // Redirige a la ruta "/partidas/dashboard"
        }, 2000); // 2000 ms = 2 segundos*/
    };

    const temporizador = () => {
        setTimeout(() => {
            navigate('/partidas/dashboard'); // Redirige a la ruta "/partidas/dashboard"
        }, 2000); // 2000 ms = 2 segundos*/
    }
    useEffect(() => {
        info_partida();
        const intervalId = setInterval(() => {
            info_partida();
        }, 5000); // Son ms
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

    return (
        <div>
            {isRedirecting ? (
                <div>
                    <h1>¡La partida comenzará en!</h1>
                    <Cronometer initialSeconds={5} onComplete={temporizador} />
                </div>
            ) : (
                <Card className="w-96 text-center">
                    <CardHeader>
                        <CardTitle>
                            <span>{title}</span>
                            <br />
                            <span>{nombrePartida}</span>
                        </CardTitle>

                        {jugadores.length < 4 && (
                            <CardDescription className="h-fit">
                                <Loading />
                                <br />
                                <span>{description}</span>
                            </CardDescription>
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
                        <Button onClick={handleRedirect} className="mt-4 gap-10">Iniciar partida</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Room;
