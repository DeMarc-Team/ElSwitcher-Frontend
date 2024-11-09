import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CircleArrowRight, UserRound, Lock } from "lucide-react";
import { UnirsePartida } from "@/services/api/unirse_partida";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import {
    SaveSessionJugador,
    SaveSessionPartida,
} from "@/services/session_browser";

interface FormUnirseProps {
    partidaId: number;
    partidaName: string;
    partidaJugadores: number;
    es_privada: boolean;
}

function FormUnirse({
    partidaId,
    partidaName,
    partidaJugadores,
    es_privada,
}: Readonly<FormUnirseProps>) {
    const MAX_LENGTH_USERNAME = 50;
    const [username, setUsername] = useState("");
    const [uniendose, setUniendose] = useState(false);
    const navigate = useNavigate();
    const { showToastAlert, showToastSuccess, closeToast } = useNotification();
    const [password, setPassword] = useState("");

    const changeUsername = (e: string) => {
        if (MAX_LENGTH_USERNAME < e.length) {
            showToastAlert("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(e);
    };

    const checkFillds = () => {
        if (username === "") {
            showToastAlert("El nombre de usuario no puede estar vacio.");
            return false;
        }
        if (password === "" && es_privada) {
            showToastAlert("La contraseña no puede estar vacia.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkFillds()) return;
        if (uniendose) {
            return;
        }
        try {
            setUniendose(true);
            const res = await UnirsePartida(partidaId, username, password);
            showToastSuccess(
                `Bienvenido "${res.nombre}" a la partida "${partidaName}."`
            );
            SaveSessionJugador({
                id: res.id_jugador,
                nombre: res.nombre,
            });
            SaveSessionPartida({
                id: partidaId,
                nombre: partidaName,
            });
            setTimeout(() => {
                navigate(`/partidas/${partidaId}/sala-espera`);
                closeToast();
            }, 1500);
        } catch (error) {
            showToastAlert("Error al unirse a la partida.");
            setUniendose(false);
            setPassword("");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="my-2 w-full justify-between rounded-md border-2 border-black bg-transparent py-3 text-center"
                >
                    <span className="mr-5 text-wrap break-all text-left">
                        <b>{partidaName}</b>
                    </span>
                    <div className="flex items-center justify-center gap-2">
                        {es_privada && (
                            <span className="flex h-[1.3rem] items-center justify-center gap-2 rounded-lg border-2 border-black px-2">
                                <Lock className="w-4" />
                            </span>
                        )}
                        <span className="mr-5 flex h-[1.3rem] items-center justify-center gap-2 rounded-lg border-2 border-black px-2">
                            <span className="font font-bold">
                                {partidaJugadores}
                            </span>
                            <UserRound className="w-4" />
                        </span>
                        <span className="underline">Unirse</span>
                        <CircleArrowRight className="w-5" />
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mr-5 text-wrap break-all text-left">
                        Unirse a la partida{" "}
                        <span className="underline">{partidaName}</span>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col gap-5">
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
                            {es_privada && (
                                <>
                                    <Label htmlFor="username">
                                        Contraseña de partida
                                    </Label>
                                    <Input
                                        className="mt-1"
                                        type="text"
                                        id="password"
                                        autoFocus={false}
                                        placeholder="Ingrese la contraseña de la partida"
                                        autoComplete="off"
                                        tabIndex={-1}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                checkFillds();
                            }}
                            type="submit"
                            className="mt-5 w-full"
                        >
                            {/* Mantener por el test */}
                            Unirse a partida
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default FormUnirse;
