import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import CardInfoDelTurno from "@/containers/partida/components/CardInfoTurno";
import { TurnoProvider } from "@/containers/partida/components/turnoContext";

vi.mock("@/services/api/obtener_info_partida", () => ({
    ObtenerInfoPartida: vi.fn(() =>
        Promise.resolve({
            nombre_partida: "Partida 1",
            nombre_creador: "Jugador 1",
            id_creador: 123,
            jugadores: [
                { id_jugador: 123, nombre: "Jugador 1" },
                { id_jugador: 125, nombre: "Jugador 2" },
            ],
            cantidad_jugadores: 2,
            iniciada: false,
        })
    ),
}));

vi.mock("@/services/api/obtener_info_turno", () => ({
    ObtenerInfoTurno: vi.fn(() =>
        Promise.resolve({
            id_jugador: 123,
            nombre_jugador: "Jugador 1",
        })
    ),
}));

const mockTurnoContextValue = {
    turnoId: 123,
    setTurnoId: vi.fn(),
};

describe("CardInfoDelTurno", () => {
    test("Se renderiza la carta de turno", async () => {
        await act(async () => {
            render(
                <TurnoProvider value={mockTurnoContextValue}>
                    <CardInfoDelTurno id_partida={1} id_jugador={123} />
                </TurnoProvider>
            );
        });
        expect(screen.getByText("TURNO DE")).toBeInTheDocument();
    });

    test("Muestra el mensaje cuando tu turno", async () => {
        await act(async () => {
            render(
                <TurnoProvider value={mockTurnoContextValue}>
                    <CardInfoDelTurno id_partida={1} id_jugador={123} />
                </TurnoProvider>
            );
        });

        await waitFor(() =>
            expect(screen.queryByText("Cargando...")).not.toBeInTheDocument()
        );

        expect(screen.getByText("Es tú turno !!")).toBeInTheDocument();
        expect(screen.getByText("Jugador 1")).toBeInTheDocument();
    });

    test("Muestra el mensaje de que no es tu turno", async () => {
        await act(async () => {
            render(
                <TurnoProvider value={mockTurnoContextValue}>
                    <CardInfoDelTurno id_partida={1} id_jugador={125} />
                </TurnoProvider>
            );
        });

        await waitFor(() =>
            expect(screen.queryByText("Cargando...")).not.toBeInTheDocument()
        );

        expect(screen.getByText("Otro jugador")).toBeInTheDocument();
        expect(screen.getByText("Jugador 1")).toBeInTheDocument();
    });
});