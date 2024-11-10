import React from "react";
import { Button } from "@/components/ui/button";

interface MensajeImputProps {
    message: string;
    setMessage: (message: string) => void;
}

const MensajeImput: React.FC<MensajeImputProps> = ({ message, setMessage }) => {
    return (
        <div className="flex space-x-3">
            <input
                type="text"
                placeholder="Escribe mensaje"
                className="border-1 w-full rounded-md border-zinc-500 p-1"
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
