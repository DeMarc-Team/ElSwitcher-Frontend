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
import { RemoveCurrentSession } from "@/services/session_browser";
import { useState } from "react";

export default function ButtonAbandonarPartida({
    idPartida,
    idJugador,
    owner_quiere_cancelar = false,
}: Readonly<{
    idPartida: number;
    idJugador: number;
    owner_quiere_cancelar?: boolean;
}>) {
    const [isOpen, setIsOpen] = useState(false);
    const { showToastError } = useNotification();
    const navigate = useNavigate();

    const handleButtonAbandonarPartida = async () => {
        try {
            await AbandonarPartida(idPartida, idJugador);
            RemoveCurrentSession();
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
                    {owner_quiere_cancelar
                        ? "Cancelar Partida"
                        : "Abandonar Partida"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {owner_quiere_cancelar
                            ? "¿Estás seguro que deseas cancelar la partida?"
                            : "¿Estás seguro que deseas abandonar la partida?"}
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
