import React from "react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
}

const MensajeImput: React.FC<MessageInputProps> = ({ message, setMessage }) => {
    return (
        <div className="flex space-x-2">
            <input
                type="text"
                placeholder="Escribe tu mensaje ..."
                className="w-full rounded-md border-2 border-zinc-500 p-2"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <Button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
                Enviar
            </Button>
        </div>
    );
};

export default MensajeImput;
