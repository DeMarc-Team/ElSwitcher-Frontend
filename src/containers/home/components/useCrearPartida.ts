import { useState, useEffect, ChangeEvent } from "react";
import { useNotification } from "@/hooks/useNotification";

export const useCrearPartida = () => {
    const MAX_LENGTH_PARTIDA_NAME = 50;
    const MAX_LENGTH_USERNAME = 50;
    const { closeToast, showToastAlert } = useNotification();

    const [partidaname, setPartidaname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

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

    const changeContrasenia = (password: string) => {
        setPassword(password);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isPasswordEnabled = event.target.checked; // Obtener el valor del checkbox
        setIsPasswordEnabled(isPasswordEnabled);

        // Si se desmarca el checkbox, se va a limpiar el campo de contraseña
        if (!isPasswordEnabled) {
            changeContrasenia("");
        }
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
        setPassword("");
    };

    return {
        partidaname,
        username,
        password,
        isPasswordEnabled,
        changePartidaName,
        changeUsername,
        changeContrasenia,
        handleCheckboxChange,
        checkFields,
        resetFields,
    };
};
