import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { crearPartida } from "@/services/api/crear_partida";
import { useCrearPartida } from "./useCrearPartida";

function CrearPartida() {
    const {
        partidaname,
        username,
        dismiss,
        changePartidaName,
        changeUsername,
        checkFields,
        showToastSuccess,
    } = useCrearPartida();

    // Cuando se cierra el componente que se cierren todos los toast
    const handleDialogClose = (isOpen: boolean) => {
        if (!isOpen) {
            dismiss();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkFields()) return;

        const res = await crearPartida({
            nombre_partida: partidaname,
            nombre_creador: username,
        });
        showToastSuccess("Partida creada con exito.");
        console.log(res);
        // TODO: COMPLETAR FUNCIONALIDAD
    };

    return (
        <Dialog onOpenChange={handleDialogClose}>
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
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5 flex w-full flex-col gap-5">
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
            <Toaster />
        </Dialog>
    );
}

export default CrearPartida;
