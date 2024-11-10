import { describe, expect, test, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { usePartida } from "@/context/PartidaContext";
import Chat from "@/containers/partida/components/Chat";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";

vi.mock("@/services/api/obtener_info_turno", () => ({
    ObtenerInfoTurno: vi.fn(),
}));

vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(() => ({
        triggerActualizarTurno: false,
    })),
}));

vi.mock("../services/api/enviar_mensaje", () => ({
    EnviarMensaje: vi.fn().mockResolvedValue({ ok: true, statusText: "OK" }),
}));

const mockPartidaContext = {
    turno_actual: undefined,
    jugador: undefined,
    partida: undefined,
    ganador: undefined,
    setPartida: vi.fn(),
    setJugador: vi.fn(),
    setGanador: vi.fn(),
    setTurnoActual: vi.fn(),
    isDataLoaded: true,
};

describe("Chat", () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    test("Se renderiza el chat inicial", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<Chat id_jugador={123} id_partida={1} />);

        await waitFor(() => {
            expect(screen.queryByText("Chat")).toBeInTheDocument();
            expect(screen.getByRole("button")).toHaveClass(
                "rounded-md border-2 border-black bg-blue-500 text-white"
            );
            expect(screen.getByPlaceholderText("Escribe un mensaje"));
        });
    });

    test("Enviar un mensaje común", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<Chat id_jugador={123} id_partida={1} />);

        const input = screen.getByPlaceholderText("Escribe un mensaje");
        fireEvent.change(input, { target: { value: "Holaaa" } });

        const sendButton = screen.getByRole("button");
        fireEvent.click(sendButton);

        setTimeout(() => {
            const mensaje = screen.getByText(/Holaaa/i);
            expect(mensaje).toBeInTheDocument();
            expect(mensaje).toHaveClass("bg-green-400");
        }, 120);
    });

    test("Enviar un mensaje con caracteres especiales", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<Chat id_jugador={123} id_partida={1} />);

        const input = screen.getByPlaceholderText("Escribe un mensaje");
        fireEvent.change(input, { target: { value: "<>#áá//)=" } });

        const sendButton = screen.getByRole("button");
        fireEvent.click(sendButton);

        setTimeout(() => {
            const mensaje = screen.getByText(/'<>\#áá\/\//i);
            expect(mensaje).toBeInTheDocument();
            expect(mensaje).toHaveClass("bg-green-400");
        }, 70);
    });

    test("Recibir un mensaje", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<Chat id_jugador={123} id_partida={1} />);

        vi.mocked(useInsidePartidaWebSocket).mockReturnValue({
            message: "",
            readyState: 1,
            ganadorInfo: null,
            closeConnection: vi.fn(),
            openConnectionToPartida: vi.fn(),
            triggerHayGanador: false,
            triggerActualizarSalaEspera: false,
            triggerActualizarTurno: false,
            triggeractualizarTablero: false,
            triggerActualizarCartasMovimiento: false,
            triggerSeCanceloPartida: false,
            triggerActualizarCartasFigura: false,
            triggerSincronizarMensaje: true,
            objectMessages: {
                message: "¡Hola desde otro jugador!",
                id_jugador: 124,
                type_message: "USER",
            },
        });

        setTimeout(() => {
            const mensaje = screen.getByText(/¡Hola desde otro jugador!/i);
            expect(mensaje).toBeInTheDocument();
            expect(mensaje).toHaveClass("bg-blue-400");
        }, 70);
    });

    test("Recibir un log", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<Chat id_jugador={123} id_partida={1} />);

        vi.mocked(useInsidePartidaWebSocket).mockReturnValue({
            message: "",
            readyState: 1,
            ganadorInfo: null,
            closeConnection: vi.fn(),
            openConnectionToPartida: vi.fn(),
            triggerHayGanador: false,
            triggerActualizarSalaEspera: false,
            triggerActualizarTurno: false,
            triggeractualizarTablero: false,
            triggerActualizarCartasMovimiento: false,
            triggerSeCanceloPartida: false,
            triggerActualizarCartasFigura: false,
            triggerSincronizarMensaje: true,
            objectMessages: {
                message: "El jugador usó una carta de moviemiento",
                id_jugador: 124,
                type_message: "ACTION",
            },
        });

        setTimeout(() => {
            const mensaje = screen.getByText(
                /El jugador usó una carta de moviemiento/i
            );
            expect(mensaje).toBeInTheDocument();
            expect(mensaje).toHaveClass("bg-red-400");
        }, 70);
    });
});
