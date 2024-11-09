export interface objectMessagesProps {
    message: string;
    id_jugador: number;
    type_message: "ACTION" | "USER";
}

export interface MessageProps {
    id_jugador: number;
    id_partida: number;
}
