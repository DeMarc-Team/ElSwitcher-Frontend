import { useState, useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";

export const useCrearPartida = () => {
    const MAX_LENGTH_PARTIDA_NAME = 50;
    const MAX_LENGTH_USERNAME = 50;
    const { closeToast, showToastAlert } = useNotification();

    const [partidaname, setPartidaname] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        closeToast();
    }, [partidaname, username]);

    const changePartidaName = (name: string) => {
        if (name.length > MAX_LENGTH_PARTIDA_NAME) {
            showToastAlert("El nombre de la partida es muy largo.");
            return;
        }
        setPartidaname(name);
    };

    const changeUsername = (name: string) => {
        if (name.length > MAX_LENGTH_USERNAME) {
            showToastAlert("El nombre de usuario es muy largo.");
            return;
        }
        setUsername(name);
    };

    const checkFields = () => {
        if (username === "" && partidaname === "") {
            showToastAlert(
                "El nombre de usuario y el nombre de la partida no pueden estar vacios."
            );
            return false;
        }
        if (username === "") {
            showToastAlert("El nombre de usuario no puede estar vacio.");
            return false;
        }
        if (partidaname === "") {
            showToastAlert("El nombre de la partida no puede estar vacio.");
            return false;
        }
        return true;
    };

    const resetFields = () => {
        setPartidaname("");
        setUsername("");
    };

    return {
        partidaname,
        username,
        changePartidaName,
        changeUsername,
        checkFields,
        resetFields,
    };
};
