import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { crearPartida } from "@/services/api/crear_partida";
import { useNotification } from "@/hooks/useNotification";
import { useCrearPartida } from "./useCrearPartida";
import { SaveSessionJugador } from "@/services/session_jugador";

function CrearPartida() {
    const [isOpen, setIsOpen] = useState(false);
    const [uniendose, setUniendose] = useState(false);
    const navigate = useNavigate();
    const {
        partidaname,
        username,
        changePartidaName,
        changeUsername,
        checkFields,
        resetFields,
    } = useCrearPartida();

    const { showToastSuccess, showToastError, closeToast } = useNotification();

    // Cuando se cierra el componente que se cierren todos los toast
    const handleDialogClose = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            closeToast();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkFields()) return;
        let partidaId: number | undefined;
        if (uniendose) {
            return;
        }
        try {
            const res = await crearPartida({
                nombre_partida: partidaname,
                nombre_creador: username,
            });

            setUniendose(true);

            showToastSuccess(
                `Partida '${res.nombre_partida}' creada con éxito.`
            );
            partidaId = res.id;
            SaveSessionJugador({
                id: res.id_creador,
                nombre: res.nombre_creador,
                id_partida: res.id,
            });
        } catch (error) {
            console.error("Error creando partida:", error);
            showToastError("Error: no se pudo crear la partida.");
            return; // Sale de la función si hay error
        }

        setTimeout(async () => {
            try {
                showToastSuccess(`Bienvenido a la partida "${partidaname}."`);
                setTimeout(() => {
                    handleDialogClose();
                    resetFields();
                    navigate(`/partidas/${partidaId}/sala-espera`, {
                        state: { nombre_creador: username }, //Paso el nombre a la sala de espera
                    });
                }, 2000);
            } catch (error) {
                showToastError("Error al unirse a la partida.");
            }
        }, 2000);
    };

    return (
        <Dialog onOpenChange={handleDialogClose} open={isOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center justify-center gap-1">
                    Crear Partida <Plus className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Crear <b className="uppercase">Nueva Partida !!</b>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mt-1 flex w-full flex-col gap-5">
                        <div className="w-full">
                            <Label htmlFor="partidaname">
                                Nombre de Partida
                            </Label>
                            <Input
                                className="mt-1"
                                type="text"
                                id="partidaname"
                                autoFocus={false}
                                placeholder="Ingrese el nombre de la partida"
                                autoComplete="off"
                                tabIndex={-1}
                                value={partidaname}
                                onChange={(e) =>
                                    changePartidaName(e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="username">Nombre de Usuario</Label>
                            <Input
                                className="mt-1"
                                type="text"
                                id="username"
                                autoFocus={false}
                                placeholder="Ingrese su nombre de usuario"
                                autoComplete="off"
                                tabIndex={-1}
                                value={username}
                                onChange={(e) => changeUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <Button type="submit" className="mt-5 w-full">
                            Crear Partida
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CrearPartida;
