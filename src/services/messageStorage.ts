interface objectMessagesProps {
    message: string;
    id_jugador: number;
    type_message: "ACTION" | "USER";
}

const SESSION_MESSAGES_KEY = "session_messages";

export const saveMessagesToStorage = (messages: objectMessagesProps[]) => {
    try {
        sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
    } catch (error) {
        console.error(
            "Error al guardar los mensajes en sessionStorage:",
            error
        );
    }
};

export const loadMessagesFromStorage = (): objectMessagesProps[] | null => {
    try {
        const savedMessages = sessionStorage.getItem(SESSION_MESSAGES_KEY);
        return savedMessages ? JSON.parse(savedMessages) : null;
    } catch (error) {
        console.error(
            "Error al cargar los mensajes desde sessionStorage:",
            error
        );
        return null;
    }
};

export const clearMessagesFromStorage = () => {
    try {
        sessionStorage.removeItem(SESSION_MESSAGES_KEY);
    } catch (error) {
        console.error(
            "Error al limpiar los mensajes de sessionStorage:",
            error
        );
    }
};
