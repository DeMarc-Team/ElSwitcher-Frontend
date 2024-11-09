import React, { useEffect, useRef, useState } from "react";
import { EnviarMensaje } from "@/services/api/enviar_mensaje";
import { Button } from "@/components/ui/button";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { usePartida } from "@/context/PartidaContext";
import "./chat.css";

interface MessageProps {
    id_jugador: number;
    id_partida: number;
}

interface objectMessagesProps {
    message: string;
    id_jugador: number;
    type_message: "ACTION" | "USER";
}

const Chat: React.FC<MessageProps> = ({ id_jugador, id_partida }) => {
    const [message, setMessage] = useState<string>("");
    const [messagesList, setMessagesList] = useState<objectMessagesProps[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { triggerSincronizarMessage, objectMessages } =
        useInsidePartidaWebSocket();
    const { turno_actual } = usePartida();

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        EnviarMensaje(id_partida, id_jugador, message);
        /*const newMessages = {
            message: "hola",
            id_jugador: 10,
            type_message: "USER",
        } as objectMessagesProps;*/
        //setMessagesList((prevMessages) => [...prevMessages, newMessages]);
        setMessage("");
    };

    useEffect(() => {
        if (objectMessages) {
            receiverMessages(objectMessages);
        }
    }, [triggerSincronizarMessage]);

    const receiverMessages = (message: objectMessagesProps) => {
        setMessagesList((state) => [...state, message]);
        scrollToBottom();
    };

    useEffect(() => {
        scrollToBottom();
    }, [messagesList]);

    return (
        <div className="mx-auto max-w-lg rounded-lg bg-zinc-800 p-4">
            <form onSubmit={handleSubmit}>
                <h1 className="text-1xl my-2 rounded-md p-2 text-center font-bold text-blue-500">
                    Chat partida
                </h1>
                <ul
                    className="mb-4 max-h-[300px] overflow-y-auto rounded-lg bg-zinc-700 p-2"
                    style={{ height: "300px" }}
                >
                    {messagesList.map((object_iterator, i) => (
                        <li
                            key={i}
                            className={`my-2 table rounded-md p-2 text-sm ${object_iterator?.id_jugador === turno_actual?.id ? "bg-sky-700" : "ml-auto bg-green-700"}`}
                        >
                            <span className="text-xs text-slate-900">
                                {object_iterator.type_message === "USER"
                                    ? object_iterator.message
                                    : object_iterator.message}
                            </span>
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>
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
            </form>
        </div>
    );
};

export default Chat;
