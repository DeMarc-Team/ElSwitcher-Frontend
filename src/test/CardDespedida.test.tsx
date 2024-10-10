import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CardDespedida from "@/containers/partida/components/CardDespedida";
import { BrowserRouter } from "react-router-dom";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";

// Mock de los contextos
vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(),
}));

// Mock de confetti
vi.mock("canvas-confetti", () => ({
    __esModule: true,
    default: vi.fn(),
}));

describe("Componente CardDespedida", () => {
    it("muestra mensaje de victoria correctamente", () => {
        (usePartida as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            jugador: { id: 1, nombre: "Jugador1" },
        });
        (
            useInsidePartidaWebSocket as unknown as ReturnType<typeof vi.fn>
        ).mockReturnValue({
            ganadorInfo: { id: 1 },
        });

        render(
            <BrowserRouter>
                <CardDespedida />
            </BrowserRouter>
        );

        expect(screen.getByText(/¡Ganaste "Jugador1"!/i)).toBeInTheDocument();
        expect(screen.getByText("🎉 🎉 🎉")).toBeInTheDocument();
    });

    it("muestra mensaje de derrota correctamente", () => {
        (usePartida as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            jugador: { id: 1, nombre: "Jugador1" },
        });
        (
            useInsidePartidaWebSocket as unknown as ReturnType<typeof vi.fn>
        ).mockReturnValue({
            ganadorInfo: { id: 2 },
        });

        render(
            <BrowserRouter>
                <CardDespedida />
            </BrowserRouter>
        );

        expect(screen.getByText(/Perdiste "Jugador1"/i)).toBeInTheDocument();
        expect(screen.getByText("😢 😢 😢")).toBeInTheDocument();
    });
});
