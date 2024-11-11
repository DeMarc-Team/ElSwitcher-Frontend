import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Cronometro } from "@/containers/partida/components/Cronometro";
import { usePartida } from "@/context/PartidaContext";
import { ObtenerTiempoCronometro } from "@/services/api/obtener_tiempo_cronometro";

vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(() => ({
        triggerSincronizarTurno: true,
    })),
}));

vi.mock("@/services/api/obtener_tiempo_cronometro", () => ({
    ObtenerTiempoCronometro: vi.fn(),
}));

const cleanMovimientoContextoMock = vi.fn();
const cleanFiguraContextoMock = vi.fn();

vi.mock("@/context/UsarCartaMovimientoContext", () => ({
    useMovimientoContext: vi.fn(() => ({
        cleanMovimientoContexto: cleanMovimientoContextoMock,
    })),
}));

vi.mock("@/context/UsarCartaFiguraContext", () => ({
    useFiguraContext: vi.fn(() => ({
        cleanFiguraContexto: cleanFiguraContextoMock,
    })),
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
    test("Cronometro se renderiza correctmente", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 60,
        });

        render(<Cronometro id_partida={1} />);
    });

    test("Debería mostrar '¡Tiempo terminado!' cuando el tiempo haya llegado a cero", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
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

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 60,
        });

        render(<Cronometro id_partida={1} />);

        await waitFor(() => {
            expect(screen.getByText(/seg/)).toBeInTheDocument();
        });
    });

    test("Si el tiempo es menor a 10 segundos, debería mostrar el tiempo en rojo", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 5,
        });

        await act(async () => {
            render(<Cronometro id_partida={1} />);
        });

        await waitFor(() => {
            const cronometro = screen.getByTestId("cronometro");
            expect(cronometro).toBeInTheDocument();
            expect(cronometro).toHaveClass("bg-red-500");
        });
    });

    test("Si el tiempo es mayor a 10 segundos y menor a 30 segundos, debería mostrar el tiempo en naranja", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 20,
        });

        await act(async () => {
            render(<Cronometro id_partida={1} />);
        });

        await waitFor(() => {
            const cronometro = screen.getByTestId("cronometro");
            expect(cronometro).toBeInTheDocument();
            expect(cronometro).toHaveClass("bg-orange-400");
        });
    });

    test("Si el tiempo es mayor a 30 segundos y menor a 60 segundos, debería mostrar el tiempo en amarillo", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 40,
        });

        await act(async () => {
            render(<Cronometro id_partida={1} />);
        });

        await waitFor(() => {
            const cronometro = screen.getByTestId("cronometro");
            expect(cronometro).toBeInTheDocument();
            expect(cronometro).toHaveClass("bg-yellow-400");
        });
    });

    test("Si el tiempo es mayor a 60 segundos, debería mostrar el tiempo en azul", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerTiempoCronometro).mockResolvedValue({
            inicio: new Date().toISOString(),
            duracion: 70,
        });

        await act(async () => {
            render(<Cronometro id_partida={1} />);
        });

        await waitFor(() => {
            const cronometro = screen.getByTestId("cronometro");
            expect(cronometro).toBeInTheDocument();
            expect(cronometro).toHaveClass("bg-blue-400");
        });
    });
});
