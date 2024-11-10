import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import CardMovParciales from "@/containers/partida/components/CardMovParciales";
import { ObtenerCartasMovimientosParciales } from "@/services/api/obtener_mov_parciales";
import { CancelarMovParcial } from "@/services/api/cancelar_mov_parcial";
import { usePartida } from "@/context/PartidaContext";

vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(() => {
        return {
            triggerActualizarCartasMovimiento: true,
            triggerActualizarTurno: true,
        };
    }),
}));

vi.mock("@/hooks/useNotification", () => ({
    useNotification: vi.fn(() => ({
        showToastInfo: vi.fn(),
        closeToast: vi.fn(),
    })),
}));

vi.mock("@/services/api/obtener_mov_parciales", () => ({
    ObtenerCartasMovimientosParciales: vi.fn(),
}));

vi.mock("@/services/api/cancelar_mov_parcial", () => ({
    CancelarMovParcial: vi.fn(),
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

describe("CardMovParciales", () => {
    
    test('Mostrar mensaje de "..." si no es el turno del jugador', async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            partida: { id: 1, nombre: "Partida1" },
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 2, nombre: "Jugador2" },
        });

        render(<CardMovParciales />);
        expect(
            screen.getByText((content) => content.includes("..."))
        ).toBeInTheDocument();
    });

    test("Mostrar 'Jugá alguna carta de movimiento' si no hay cartas de movimiento parciales", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            partida: { id: 1, nombre: "Partida1" },
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerCartasMovimientosParciales).mockReturnValue(
            Promise.resolve([])
        );

        render(<CardMovParciales />);
        await waitFor(() => {
            expect(
                screen.getByText((content) =>
                    content.includes("Jugá alguna carta de movimiento")
                )
            ).toBeInTheDocument();
        });
    });

    test("Mostrar las cartas de movimiento parciales", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            partida: { id: 1, nombre: "Partida1" },
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerCartasMovimientosParciales).mockReturnValue(
            Promise.resolve([
                { movimiento: "m1", orden: 1 },
                { movimiento: "m2", orden: 2 },
            ])
        );

        render(<CardMovParciales />);

        await waitFor(() => {
            expect(screen.getAllByRole("img").length).toBe(2);
        });
    });

    test("Mostrar botón 'Deshacer última jugada' cuando hay cartas de movimiento parciales", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            partida: { id: 1, nombre: "Partida1" },
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerCartasMovimientosParciales).mockReturnValue(
            Promise.resolve([
                { movimiento: "m1", orden: 1 },
                { movimiento: "m2", orden: 2 },
            ])
        );

        render(<CardMovParciales />);

        await waitFor(() => {
            expect(screen.getAllByRole("img").length).toBe(2);
        });

        expect(
            screen.getByRole("button", { name: "Deshacer última jugada" })
        ).toBeInTheDocument();
    });

    test("Que al tocar el boton llame a CancelarMovParcial", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            partida: { id: 1, nombre: "Partida1" },
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerCartasMovimientosParciales).mockReturnValue(
            Promise.resolve([
                { movimiento: "m1", orden: 1 },
                { movimiento: "m2", orden: 2 },
            ])
        );

        render(<CardMovParciales />);

        await waitFor(() => {
            expect(screen.getAllByRole("img").length).toBe(2);
        });

        const button = screen.getByRole("button", {
            name: "Deshacer última jugada",
        });

        button.click();
        expect(vi.mocked(CancelarMovParcial)).toHaveBeenCalled();
    });

    test("Que las funciones de  CancelarMovParcial se llamen con los datos correctos", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            partida: { id: 1, nombre: "Partida1" },
            jugador: { id: 1, nombre: "Jugador1" },
            turno_actual: { id: 1, nombre: "Jugador1" },
        });

        vi.mocked(ObtenerCartasMovimientosParciales).mockReturnValue(
            Promise.resolve([
                { movimiento: "m1", orden: 1 },
                { movimiento: "m2", orden: 2 },
            ])
        );

        render(<CardMovParciales />);

        await waitFor(() => {
            expect(screen.getAllByRole("img").length).toBe(2);
        });

        const button = screen.getByRole("button", {
            name: "Deshacer última jugada",
        });

        button.click();
        expect(vi.mocked(CancelarMovParcial)).toHaveBeenCalledWith(1, 1);
    });
});
