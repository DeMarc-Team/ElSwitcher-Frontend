import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TurnoProvider } from "@/containers/partida/components/turnoContext";
import ButtonPasarTurno from "@/containers/partida/components/ButtonPasarTurno";
import { PasarTurno } from "@/services/api/pasar_turno";

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

vi.mock("@/services/api/pasar_turno", () => ({
    PasarTurno: vi.fn(() =>
        Promise.resolve({
            success: true,
            message: "Turno pasado correctamente",
        })
    ),
}));

const mockTurnoContextValue = {
    turnoId: 123,
    setTurnoId: vi.fn(),
};

describe("ButtonPasarTurno", () => {
    test("Se debería mostrar 'Pasar turno' cuando es nuestro turno", () => {
        render(
            <TurnoProvider value={mockTurnoContextValue}>
                <ButtonPasarTurno id_partida={1} id_jugador={123} />
            </TurnoProvider>
        );

        expect(screen.getByText("Pasar turno")).toBeInTheDocument();
    });

    test("Debería mostrarse el pasar turno para quien es el turno", async () => {
        render(
            <TurnoProvider value={mockTurnoContextValue}>
                <ButtonPasarTurno id_partida={1} id_jugador={123} />
            </TurnoProvider>
        );

        expect(screen.getByText("Pasar turno")).toBeDefined();
        await vi.mocked(PasarTurno(1, 123));
    });

    test("Debería mostrar 'Espera tú turno' cuando el turno no es del jugador", () => {
        mockTurnoContextValue.turnoId = 125;

        render(
            <TurnoProvider value={mockTurnoContextValue}>
                <ButtonPasarTurno id_partida={1} id_jugador={123} />
            </TurnoProvider>
        );

        expect(screen.getByText("Espera tú turno")).toBeDefined();
    });
});
