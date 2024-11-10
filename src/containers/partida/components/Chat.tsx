import React, { useEffect, useRef, useState } from "react";
import { EnviarMensaje } from "@/services/api/enviar_mensaje";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import ChatMensaje from "./ChatMensajes";
import MensajeImput from "./MensajeImput";
import { objectMessagesProps, MessageProps } from "./interfaces";
import "./chat.css";

const Chat: React.FC<MessageProps> = ({ id_jugador, id_partida }) => {
    const [message, setMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref para el final del chat.
    const { triggerSincronizarMensaje, objectMessages } =
        useInsidePartidaWebSocket();
    const [messagesList, setMessagesList] = useState<objectMessagesProps[]>([]);

    // Función para agregar el mensaje al final de la lista.
    const receiverMessages = (message: objectMessagesProps) => {
        const updatedMessages = [...messagesList, message]; // Añadir al final de la lista.
        setMessagesList(updatedMessages);
    };

    // Maneja la recepción de mensajes desde el WebSocket.
    useEffect(() => {
        if (objectMessages) {
            receiverMessages(objectMessages);
        }
    }, [triggerSincronizarMensaje]);

    // Desplazarse al final del chat.
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Desplazarse al final si la lista de mensajes cambia.
    useEffect(() => {
        scrollToBottom();
    }, [messagesList]);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        EnviarMensaje(id_partida, id_jugador, message);
        setMessage(""); // Limpiar el campo de texto después de enviar.
    };

    // Corta el mensaje cuando es más grande que maxLength caracteres y hace un "\n" para
    // concatenar el mensaje debajo.
    const wrapMessage = (message: string, maxLength: number) => {
        const lines = [];
        while (message.length > maxLength) {
            lines.push(message.slice(0, maxLength));
            message = message.slice(maxLength);
        }
        lines.push(message);
        return lines.join("\n");
    };

    return (
        <div
            className="mx-auto max-w-lg rounded-lg bg-zinc-800 p-4"
            style={{ width: "100%", maxWidth: "250px" }}
        >
            <form onSubmit={handleSubmit}>
                <h1 className="text-1xl rounded-md text-center font-bold text-blue-500">
                    Chat partida
                </h1>
                <div className="overflow-auto" style={{ maxHeight: "400" }}>
                    <ChatMensaje
                        messagesList={messagesList}
                        id_jugador={id_jugador}
                        wrapMessage={wrapMessage}
                        messagesEndRef={messagesEndRef}
                    />
                </div>
                <MensajeImput message={message} setMessage={setMessage} />
            </form>
        </div>
    );
};

export default Chat;
