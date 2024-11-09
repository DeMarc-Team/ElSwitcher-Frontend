import React from "react";
import { objectMessagesProps } from "./interfaces";

interface ChatMessagesProps {
    messagesList: objectMessagesProps[];
    id_jugador: number;
    wrapMessage: (message: string, maxLength: number) => string;
}

const ChatMensajes: React.FC<ChatMessagesProps> = ({
    messagesList,
    id_jugador,
    wrapMessage,
}) => {
    return (
        <ul
            className="mb-4 max-h-[300px] overflow-y-auto rounded-lg bg-zinc-700 p-2"
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
        </ul>
    );
};

export default ChatMensajes;
