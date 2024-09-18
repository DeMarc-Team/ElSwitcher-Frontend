import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useCrearPartida = () => {
    const MAX_LENGTH_PARTIDA_NAME = 50;
    const MAX_LENGTH_USERNAME = 50;
    const MAX_JUGADORES = 4;
    const MIN_JUGADORES = 2;
    const { toast, dismiss } = useToast();

    const [partidaname, setPartidaname] = useState("");
    const [username, setUsername] = useState("");
    const [min, setMin] = useState(2);
    const [max, setMax] = useState(4);

    useEffect(() => {
        dismiss();
    }, [partidaname, username, min, max]);

    const showToast = (message: string) => {
        toast({
            title: `CUIDADO:`,
            description: message,
            variant: "destructive",
        });
    };

    const changePartidaName = (name: string) => {
        if (name.length > MAX_LENGTH_PARTIDA_NAME) {
            showToast("El nombre de la partida es muy largo.");
            return;
        }
        setPartidaname(name);
    };

    const changeUsername = (name: string) => {
        if (name.length > MAX_LENGTH_USERNAME) {
            showToast("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(name);
    };

    const changeMinJugadores = (value: number) => {
        if (value < MIN_JUGADORES) {
            showToast(
                `El minimo de jugadores debe ser mayor a ${MIN_JUGADORES}.`
            );
            return;
        }
        if (value > MAX_JUGADORES) {
            showToast(
                `El minimo de jugadores debe ser menor a ${MAX_JUGADORES}.`
            );
            return;
        }
        if (value > max) {
            showToast(
                `El minimo de jugadores no puede ser mayor al maximo de jugadores.`
            );
            return;
        }
        setMin(value);
    };

    const changeMaxJugadores = (value: number) => {
        if (value < MIN_JUGADORES) {
            showToast(
                `El maximo de jugadores debe ser mayor a ${MIN_JUGADORES}.`
            );
            return;
        }
        if (value > MAX_JUGADORES) {
            showToast(
                `El maximo de jugadores debe ser menor a ${MAX_JUGADORES}.`
            );
            return;
        }
        if (min > value) {
            setMin(value);
        }
        setMax(value);
    };

    const checkFields = () => {
        if (username === "" && partidaname === "") {
            showToast(
                "El nombre de usuario y el nombre de la partida no pueden estar vacios."
            );
            return false;
        }
        if (username === "") {
            showToast("El nombre de usuario no puede estar vacio.");
            return false;
        }
        if (partidaname === "") {
            showToast("El nombre de la partida no puede estar vacio.");
            return false;
        }
        return true;
    };

    return {
        partidaname,
        username,
        min,
        max,
        dismiss,
        changePartidaName,
        changeUsername,
        changeMinJugadores,
        changeMaxJugadores,
        checkFields,
    };
};
