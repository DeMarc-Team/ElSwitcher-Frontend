import React, { useEffect, useRef, useState } from "react";
import { EnviarMensaje } from "@/services/api/enviar_mensaje";
import { Button } from "@/components/ui/button";
import "./chat.css";

interface Message {
    id_jugador: number;
    id_partida: number;
}

const Chat: React.FC<Message> = ({ id_jugador, id_partida }) => {
    const [mensaje, setMensaje] = useState("");
    const [messages, setMessages] = useState<string[]>([]); // Estado para almacenar mensajes

    const sendMessage = async () => {
        if (mensaje.trim() === "") return; // Evitar enviar mensajes vacíos
        try {
            const response = await EnviarMensaje(
                id_jugador,
                id_partida,
                mensaje
            );
            console.log("Mensaje enviado con éxito:", response);

            // Agregar el mensaje al estado
            setMessages((prevMessages) => [...prevMessages, mensaje]);
            setMensaje(""); // Limpiar el campo de texto
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return (
        <div>
            <div
                className="messages"
                style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    marginBottom: "10px",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "5px",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <strong>Jugador {id_jugador}:</strong> {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje..."
            />
            <Button onClick={sendMessage}>Enviar</Button>
        </div>
    );
};

export default Chat;
