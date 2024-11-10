import React, { useEffect, useRef, useState } from "react";
import { EnviarMensaje } from "@/services/api/enviar_mensaje";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import ChatMensaje from "./ChatMensajes";
import MensajeImput from "./MensajeInput";
import { ObjectMessagesProps } from "@/services/websockets/websockets_partida";

export interface MessageProps {
    id_jugador: number;
    id_partida: number;
}

const Chat: React.FC<MessageProps> = ({ id_jugador, id_partida }) => {
    const [message, setMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref para el final del chat.
    const { triggerSincronizarMensaje, objectMessages } =
        useInsidePartidaWebSocket();
    const [messagesList, setMessagesList] = useState<ObjectMessagesProps[]>([]);

    // Función para agregar el mensaje al final de la lista.
    const receiverMessages = (message: ObjectMessagesProps) => {
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
        if (message === "") return;
        EnviarMensaje(id_partida, id_jugador, message);
        setMessage(""); // Limpiar el campo de texto después de enviar.
    };

    return (
        <div className="rounded-lg border-2 border-black bg-yellow-100 px-2 pb-2">
            <form onSubmit={handleSubmit}>
                <p className="text-1xl my-1 rounded-md text-center font-bold uppercase">
                    Chat
                </p>
                <ChatMensaje
                    messagesList={messagesList}
                    id_jugador={id_jugador}
                    messagesEndRef={messagesEndRef}
                />

                <MensajeImput message={message} setMessage={setMessage} />
            </form>
        </div>
    );
};

export default Chat;
