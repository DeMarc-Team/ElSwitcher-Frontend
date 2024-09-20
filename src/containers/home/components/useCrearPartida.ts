import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useCrearPartida = () => {
    const MAX_LENGTH_PARTIDA_NAME = 50;
    const MAX_LENGTH_USERNAME = 50;
    const { toast, dismiss } = useToast();

    const [partidaname, setPartidaname] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        dismiss();
    }, [partidaname, username]);

    const showToastError = (message: string) => {
        toast({
            title: `CUIDADO:`,
            description: message,
            variant: "destructive",
        });
    };

    const showToastSuccess = (message: string) => {
        toast({
            title: `EXITO:`,
            description: message,
        });
    }

    const changePartidaName = (name: string) => {
        if (name.length > MAX_LENGTH_PARTIDA_NAME) {
            showToastError("El nombre de la partida es muy largo.");
            return;
        }
        setPartidaname(name);
    };

    const changeUsername = (name: string) => {
        if (name.length > MAX_LENGTH_USERNAME) {
            showToastError("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(name);
    };

    const checkFields = () => {
        if (username === "" && partidaname === "") {
            showToastError(
                "El nombre de usuario y el nombre de la partida no pueden estar vacios."
            );
            return false;
        }
        if (username === "") {
            showToastError("El nombre de usuario no puede estar vacio.");
            return false;
        }
        if (partidaname === "") {
            showToastError("El nombre de la partida no puede estar vacio.");
            return false;
        }
        return true;
    };

    return {
        partidaname,
        username,
        dismiss,
        changePartidaName,
        changeUsername,
        checkFields,
        showToastError,
        showToastSuccess,
    };
};
