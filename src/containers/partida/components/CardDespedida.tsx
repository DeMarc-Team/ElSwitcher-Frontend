import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { useEffect, useState } from "react";
import { RemoveCurrentSession } from "@/services/session_browser";

const CardDespedida = () => {
    const { jugador } = usePartida();
    const { ganadorInfo } = useInsidePartidaWebSocket();
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (jugador && ganadorInfo) {
            if (jugador.id == ganadorInfo.id) {
                setTitulo(`¡Ganaste "${jugador.nombre}"!`);
                setDescripcion("🎉 🎉 🎉");
                showConfetti();
            } else {
                setTitulo(`Perdiste "${jugador.nombre}"`);
                setDescripcion("😢 😢 😢");
            }
            RemoveCurrentSession();
        }
    }, []);

    const showConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 150,
            origin: { y: 0.6 },
            zIndex: 5,
        });
    };

    return (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
            <Card className="z-10 flex h-56 w-96 flex-col items-center justify-center">
                <CardHeader className="pb-1">
                    <CardTitle>{titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="pb-0 text-xl">
                        {descripcion}
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => navigate("/#listapartidas")}>
                        Volver al inicio
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CardDespedida;
