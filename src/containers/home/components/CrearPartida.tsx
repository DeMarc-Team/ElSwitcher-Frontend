import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

function CrearPartida() {
    const MAX_LENGTH_PARTIDA_NAME = 50;
    const MAX_LENGTH_USERNAME = 50;
    const { toast, dismiss } = useToast();
    const [partidaname, setPartidaname] = useState("");
    const [username, setUsername] = useState("");
    const [min, setMin] = useState(2);
    const [max, setMax] = useState(4);

    useEffect(() => {
        dismiss();
    }, [partidaname, username, min, max]);

    const changePartidaName = (e: string) => {
        if (MAX_LENGTH_PARTIDA_NAME < e.length) {
            showToast("El nombre de la partida es muy largo.");
            return;
        }
        setPartidaname(e);
    };
    const changeUsername = (e: string) => {
        if (MAX_LENGTH_USERNAME < e.length) {
            showToast("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(e);
    };
    const changeMinJugadores = (e: number) => {
        if (e < 2 || e > 4) {
            showToast("El minimo de jugadores debe ser entre 2 y 4.");
            return;
        }
        if (e > max) {
            showToast("El minimo de jugadores no puede ser mayor al maximo.");
            return;
        }
        setMin(e);
    };
    // Si el minimo es mayor al maximo, entonces el minimo se iguala al maximo
    const changeMaxJugadores = (e: number) => {
        if (e < 2 || e > 4) {
            showToast("El maximo de jugadores debe ser entre 2 y 4.");
            return;
        }
        if (min > e) {
            setMin(e);
        }
        setMax(e);
    };

    const checkUsername = () => {
        if (username === "") {
            showToast("El nombre de usuario no puede estar vacio.");
            return false;
        }
        return true;
    };

    const checkPartidaName = () => {
        if (partidaname === "") {
            showToast("El nombre de la partida no puede estar vacio.");
            return false;
        }
        return true;
    };

    const showToast = (message: string) => {
        toast({
            description: message,
            variant: "destructive",
        });
    };

    const handleDialogClose = (isOpen: boolean) => {
        if (!isOpen) {
            dismiss();
        }
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
                <div /* TODO: COMPLETAR ACA y por un form */>
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
                            <Label>Cantidad de jugadores</Label>
                            <div className="flex items-center gap-2">
                                <small className="text-gray-500"></small>
                                <Label htmlFor="minjugadores">Minimo</Label>
                                <Input
                                    className="mt-1"
                                    type="number"
                                    id="minjugadores"
                                    autoFocus={false}
                                    placeholder="Minimo"
                                    autoComplete="off"
                                    tabIndex={-1}
                                    value={min}
                                    onChange={(e) =>
                                        changeMinJugadores(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <Label htmlFor="maxjugadores">Maximo</Label>
                                <Input
                                    className="mt-1"
                                    type="number"
                                    id="maxjugadores"
                                    autoFocus={false}
                                    placeholder="Maximo"
                                    autoComplete="off"
                                    tabIndex={-1}
                                    value={max}
                                    onChange={(e) =>
                                        changeMaxJugadores(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
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
                        <Button
                            onClick={() => {
                                checkUsername();
                                checkPartidaName();
                            }}
                            type="submit"
                            className="mt-5 w-full"
                        >
                            Crear Partida
                        </Button>
                    </div>
                </div>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
}

export default CrearPartida;
