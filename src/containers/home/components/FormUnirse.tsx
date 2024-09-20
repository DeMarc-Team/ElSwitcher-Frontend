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
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface FormUnirseProps {
    partidaId: number;
    partidaName: string;
}

function FormUnirse({ partidaId, partidaName }: FormUnirseProps) {
    const MAX_LENGTH_USERNAME = 50;

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const changeUsername = (e: string) => {
        if (MAX_LENGTH_USERNAME < e.length) {
            showToast("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(e);
    };

    const checkUsername = () => {
        if (username === "") {
            showToast("El nombre de usuario no puede estar vacio.");
            return false;
        }
        navigate(`/espera/${partidaId}`);
        return true;
    };

    const showToast = (message: string) => {
        toast({
            description: message,
            variant: "destructive",
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: COMPLETAR FUNCIONALIDAD
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="my-2 w-full rounded-md border-black py-3 text-center"
                >
                    <span>
                        Unirse a <b>{partidaName}</b>
                    </span>
                    <ArrowUpRight className="ml-5 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
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
            <Toaster />
        </Dialog>
    );
}
export default FormUnirse;
