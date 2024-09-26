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
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { UnirsePartida } from "@/services/api/unirse_partida";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";

interface FormUnirseProps {
    partidaId: number;
    partidaName: string;
}

function FormUnirse({ partidaId, partidaName }: Readonly<FormUnirseProps>) {
    const MAX_LENGTH_USERNAME = 50;

    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { showToastAlert, showToastSuccess, closeToast } = useNotification();

    const changeUsername = (e: string) => {
        if (MAX_LENGTH_USERNAME < e.length) {
            showToastAlert("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(e);
    };

    const checkUsername = () => {
        if (username === "") {
            showToastAlert("El nombre de usuario no puede estar vacio.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkUsername()) return;

        try {
            const res = await UnirsePartida(partidaId, username);
            showToastSuccess(
                `Bienvenido "${res.nombre}" a la partida "${partidaName}."`
            );
            setTimeout(() => {
                navigate(`/partidas/${partidaId}/sala-espera`);
                closeToast();
            }, 2000);
        } catch (error) {
            showToastAlert("Error al unirse a la partida.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="my-2 w-full rounded-md border-black bg-transparent py-3 text-center"
                >
                    <span>
                        Unirse a <b>{partidaName}</b>
                    </span>
                    <ArrowUpRight className="ml-5 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Unirse a la partida{" "}
                        <span className="underline">{partidaName}</span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5 flex w-full flex-col gap-5">
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
                            }}
                            type="submit"
                            className="mt-5 w-full"
                        >
                            Unirse
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default FormUnirse;