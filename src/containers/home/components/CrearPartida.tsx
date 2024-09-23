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
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { UnirsePartida } from "@/services/api/unirse_partida";
import { useNavigate } from "react-router-dom";

function CrearPartida() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const {
        partidaname,
        username,
        dismiss,
        changePartidaName,
        changeUsername,
        checkFields,
        showToastSuccess,
        showToastError,
        resetFields,
    } = useCrearPartida();

    // Cuando se cierra el componente que se cierren todos los toast
    const handleDialogClose = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            dismiss();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkFields()) return;
    
        let partidaId: number | undefined;
        let unirsepartida = false;        
    
        try {
            const res = await crearPartida({
                nombre_partida: partidaname,
                nombre_creador: username,
            });
    
            showToastSuccess(`Partida '${res.nombre_partida}' creada con éxito.`);
            partidaId = res.id;
            unirsepartida = true;
    
            setTimeout(() => {
                handleDialogClose();
                resetFields();
            }, 1000);
        } catch (error) {
            console.error("Error creando partida:", error);
            showToastError("Error: no se pudo crear la partida.");
            return; // Sale de la función si hay error
        }
    
        if (unirsepartida && partidaId !== undefined) {
            try {
                const res = await UnirsePartida(partidaId, username);
                showToastSuccess(`Bienvenido "${res.nombre}" a la partida "${partidaname}."`);
                setTimeout(() => {
                    navigate(`/partidas/${partidaId}/sala-espera`);
                    // console.log("Unirsepartida")
                    // console.log(unirsepartida)
                    // console.log("PartidaID")
                    // console.log(partidaId)
                }, 2000);
            } catch (error) {
                showToastError("Error al unirse a la partida.");
            }
        }
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
            <Toaster />
        </Dialog>
    );
}

export default CrearPartida;
