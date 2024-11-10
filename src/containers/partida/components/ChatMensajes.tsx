import React from "react";
import { ObjectMessagesProps } from "@/services/websockets/websockets_partida";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMensajeProps {
    messagesList: ObjectMessagesProps[];
    id_jugador: number;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMensajes: React.FC<ChatMensajeProps> = ({
    messagesList,
    id_jugador,
    messagesEndRef,
}) => {
    return (
        <ScrollArea className="mb-1 h-[267px] rounded-lg border-2 border-black bg-white px-1">
            <ul>
                {messagesList.map((msg, i) => {
                    let messageClass = "bg-red-400";
                    if (msg.type_message == "USER") {
                        messageClass =
                            msg.id_jugador === id_jugador
                                ? "ml-auto bg-green-400"
                                : "bg-blue-400";
                    }
                    return (
                        <li
                            key={`chat-message-${i}`}
                            className={`my-2 table max-w-[140px] text-wrap break-all rounded-md border-2 border-black p-2 text-sm ${messageClass}`}
                        >
                            <span className="text-xs text-slate-900">
                                {msg.message}
                            </span>
                        </li>
                    );
                })}
                <p ref={messagesEndRef} />
            </ul>
        </ScrollArea>
    );
};

export default ChatMensajes;
