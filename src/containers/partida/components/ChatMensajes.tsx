import React from "react";
import { objectMessagesProps } from "./interfaces";

interface ChatMensajeProps {
    messagesList: objectMessagesProps[];
    id_jugador: number;
    wrapMessage: (message: string, maxLength: number) => string;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMensajes: React.FC<ChatMensajeProps> = ({
    messagesList,
    id_jugador,
    wrapMessage,
    messagesEndRef,
}) => {
    return (
        <ul
            className="mb-4 max-h-[110px] overflow-y-auto rounded-lg bg-zinc-700 p-2"
            style={{ height: "300px" }}
        >
            {messagesList.map((object_iterator, i) => (
                <li
                    key={i}
                    className={`my-2 table rounded-md p-2 text-sm ${object_iterator.id_jugador === id_jugador ? "ml-auto bg-green-700" : "bg-sky-700"}`}
                >
                    <span
                        className="text-xs text-slate-900"
                        style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            maxWidth: "100%",
                        }}
                    >
                        {object_iterator.type_message === "USER"
                            ? wrapMessage(object_iterator.message, 20)
                            : wrapMessage(object_iterator.message, 20)}
                    </span>
                </li>
            ))}
            <div ref={messagesEndRef} />
        </ul>
    );
};

export default ChatMensajes;
