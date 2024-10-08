import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AbandonarPartida } from "@/services/api/abandonar_partida";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import {
    RemoveSessionJugador,
    RemoveSessionPartida,
} from "@/services/session_browser";
import { useState } from "react";

export default function ButtonAbandonarPartida({
    idPartida,
    idJugador,
}: Readonly<{
    idPartida: number;
    idJugador: number;
}>) {
    const [isOpen, setIsOpen] = useState(false);
    const { showToastError } = useNotification();
    const navigate = useNavigate();

    const handleButtonAbandonarPartida = async () => {
        try {
            await AbandonarPartida(idPartida, idJugador);
            RemoveSessionJugador();
            RemoveSessionPartida();
            navigate("/#listapartidas");
        } catch (error) {
            showToastError("Error al abandonar la partida.");
        }
    };
    return (
        <Dialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    className="border-2 border-black hover:bg-red-600"
                    variant="destructive"
                >
                    Abandonar Partida
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        ¿Estás seguro que deseas abandonar la partida?
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>

                <div className="flex justify-center gap-3">
                    <Button
                        variant="destructive"
                        className="w-full border-2 border-black hover:bg-red-600"
                        onClick={handleButtonAbandonarPartida}
                    >
                        Sí
                    </Button>
                    <Button onClick={() => setIsOpen(false)} className="w-full">
                        No
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
