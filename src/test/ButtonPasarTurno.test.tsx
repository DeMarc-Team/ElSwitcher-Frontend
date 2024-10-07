import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ButtonPasarTurno from "@/containers/partida/components/ButtonPasarTurno";
import { PasarTurno } from "@/services/api/pasar_turno";
import { usePartida } from "@/context/PartidaContext";
import { useNotification } from "@/hooks/useNotification";

// Mockear `usePartida`
vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

// Mockear `useNotification`
vi.mock("@/hooks/useNotification", () => ({
    useNotification: vi.fn(),
}));

// Mockear `PasarTurno`
vi.mock("@/services/api/pasar_turno", () => ({
    PasarTurno: vi.fn(),
}));

describe("ButtonPasarTurno", () => {
    const mockShowToast = vi.fn();
    const mockCloseToast = vi.fn();

    // Ejecutar antes de cada test:
    beforeEach(() => {
        // Configurar el mock de useNotification
        vi.mocked(useNotification).mockReturnValue({
            showToastAlert: mockShowToast,
            closeToast: mockCloseToast,
            showToastError: vi.fn(),
            showToastSuccess: vi.fn(),
            showToastInfo: vi.fn(),
            showToastWarning: vi.fn(),
        });
    });

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

    test("Debería permitir pasar turno cuando es el turno del jugador", async () => {
        // Configurar el mock de usePartida para que sea el turno del jugador
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        // Renderizar el componente
        render(<ButtonPasarTurno />);

        // Verificar que se muestra "Pasar turno"
        expect(screen.getByText("Pasar turno")).toBeInTheDocument();

        // Simular el click en el botón de pasar turno
        await act(async () => {
            fireEvent.click(screen.getByText("Pasar turno"));
        });

        // Verificar que se llamó a la función `PasarTurno`
        expect(PasarTurno).toHaveBeenCalledWith(1, 123);
    });

    test("Debería mostrar 'Espera tú turno' cuando no es el turno del jugador", () => {
        // Configurar el mock de usePartida para que no sea el turno del jugador
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 125, nombre: "Jugador 2" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        // Renderizar el componente
        render(<ButtonPasarTurno />);

        // Verificar que se muestra "Espera tú turno"
        expect(screen.getByText("Espera tú turno")).toBeInTheDocument();
    });

    test("Debería mostrar una notificación de error si la API falla", async () => {
        // Configurar el mock de usePartida para que sea el turno del jugador
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        // Configurar el mock de PasarTurno para que falle
        vi.mocked(PasarTurno).mockRejectedValue(new Error("Error de red"));

        // Renderizar el componente
        render(<ButtonPasarTurno />);

        // Simular el click en el botón de pasar turno
        await act(async () => {
            fireEvent.click(screen.getByText("Pasar turno"));
        });

        // Verificar que se muestra una notificación de error
        expect(mockShowToast).toHaveBeenCalledWith("Error al pasar el turno.");
    });
});
