import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MensajeImputProps {
    message: string;
    setMessage: (message: string) => void;
}

const MensajeInput: React.FC<MensajeImputProps> = ({ message, setMessage }) => {
    return (
        <div className="flex gap-1">
            <input
                type="text"
                placeholder="Escribe un mensaje"
                className="w-full rounded-md border-2 border-black px-2"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <Button
                type="submit"
                size="sm"
                variant={"outline"}
                className="rounded-md border-2 border-black bg-blue-500 text-white"
            >
                <Send size={15} />
            </Button>
        </div>
    );
};

export default MensajeInput;
