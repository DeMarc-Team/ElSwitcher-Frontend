import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Cronometro } from "@/containers/partida/components/Cronometro";
import { usePartida } from "@/context/PartidaContext";
import { useInsidePartidaWebSocket } from "@/context/PartidaWebsocket";
import { Cronometro_ } from "@/services/api/cronometro";
import { useMovimientoContext } from "@/context/UsarCartaMovimientoContext";
import { useFiguraContext } from "@/context/UsarCartaFiguraContext";

vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(() => ({
        triggerSincronizarTurno: true,
    })),
}));

vi.mock("@/services/api/cronometro", () => ({
    Cronometro_: vi.fn(),
}));

vi.mock("@/context/UsarCartaMovimientoContext", () => ({
    useMovimientoContext: vi.fn(),
}));

vi.mock("@/context/UsarCartaFiguraContext", () => ({
    useFiguraContext: vi.fn(),
}));

const mockPartidaContext = {
    partida: { id: 1, nombre: "Partida1" },
    jugador: { id: 1, nombre: "Jugador1" },
    turno_actual: { id: 1, nombre: "Jugador1" },
    ganador: undefined,
    isDataLoaded: true,
    setPartida: vi.fn(),
    setJugador: vi.fn(),
    setTurnoActual: vi.fn(),
    setGanador: vi.fn(),
};

describe("Cronometro", () => {
    test("Debería limpiar los contextos cuando el tiempo llegue a cero", async () => {
        const cleanMovimientoContexto = vi.fn();
        const cleanFiguraContexto = vi.fn();

        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mock("@/context/UsarCartaMovimientoContext", () => ({
            useMovimientoContext: vi.fn(() => ({
                cleanMovimientoContexto: vi.fn(),
            })),
        }));

        vi.mock("@/context/UsarCartaFiguraContext", () => ({
            useFiguraContext: vi.fn(() => ({
                cleanFiguraContexto: vi.fn(),
            })),
        }));

        vi.mocked(Cronometro_).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 0,
        });

        render(<Cronometro id_partida={1} />);

        await waitFor(() => {
            expect(cleanMovimientoContexto).toHaveBeenCalled();
            expect(cleanFiguraContexto).toHaveBeenCalled();
        });
    });

    test("Debería mostrar el cronómetro con el mensaje adecuado cuando es el turno del jugador", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(Cronometro_).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 60,
        });

        render(<Cronometro id_partida={1} />);

        await waitFor(() => {
            expect(screen.getByText("Jugador1 te quedan:")).toBeInTheDocument();
        });
    });

    test("Debería mostrar '¡Tiempo terminado!' cuando el tiempo haya llegado a cero", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(Cronometro_).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 0,
        });

        render(<Cronometro id_partida={1} />);

        await waitFor(() => {
            expect(screen.getByText("¡Tiempo terminado!")).toBeInTheDocument();
        });
    });

    test("Debería actualizar el cronómetro cada segundo mientras el tiempo restante sea mayor que 0", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(Cronometro_).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 60,
        });

        render(<Cronometro id_partida={1} />);

        await waitFor(() => {
            expect(screen.getByText(/segundos/)).toBeInTheDocument();
        });
    });

    test("Debería no mostrar tiempo restante cuando no haya datos del cronómetro", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(Cronometro_).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 120,
        });

        render(<Cronometro id_partida={1} />);

        await waitFor(() => {
            expect(screen.queryByText("te quedan")).toBeNull();
        });
    });
});
