import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CardInfoDelTurno from "@/containers/partida/components/CardInfoTurno";
import { ObtenerInfoTurno } from "@/services/api/obtener_info_turno";
import { usePartida } from "@/context/PartidaContext";
import { useNotification } from "@/hooks/useNotification";

vi.mock("@/services/api/obtener_info_turno", () => ({
    ObtenerInfoTurno: vi.fn(),
}));

vi.mock("@/hooks/useNotification", () => ({
    useNotification: vi.fn(),
}));

vi.mock("@/context/PartidaContext", () => ({
    usePartida: vi.fn(),
}));

vi.mock("@/context/PartidaWebsocket", () => ({
    useInsidePartidaWebSocket: vi.fn(() => ({
        triggerActualizarTurno: false,
    })),
}));

vi.mock("@/services/api/obtener_tiempo_cronometro", () => ({
    ObtenerTiempoCronometro: vi.fn(),
}));

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

describe("CardInfoDelTurno", () => {
    const mockShowToast = vi.fn();

    // Ejecutar antes de cada test:
    beforeEach(() => {
        // Configurar el mock de useNotification
        vi.mocked(useNotification).mockReturnValue({
            showToastAlert: vi.fn(),
            closeToast: vi.fn(),
            showToastError: mockShowToast,
            showToastSuccess: vi.fn(),
            showToastInfo: vi.fn(),
            showToastWarning: vi.fn(),
        });
    });

    test("Muestra 'Es tú turno !!' cuando es el turno del jugador", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<CardInfoDelTurno />);

        await waitFor(() => {
            expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
            expect(screen.getByText("Es tú turno !!")).toBeInTheDocument();
            expect(screen.getByText("Jugador 1")).toBeInTheDocument();
        });
    });

    test("Muestra 'Otro jugador' cuando no es el turno del jugador", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 321, nombre: "Jugador 321" },
            jugador: { id: 123, nombre: "Jugador 132" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        render(<CardInfoDelTurno />);

        await waitFor(() => {
            expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
            expect(screen.getByText("Otro jugador")).toBeInTheDocument();
            expect(screen.getByText("Jugador 321")).toBeInTheDocument();
        });
    });

    test("Muestra un mensaje de error si hay un problema al obtener el turno", async () => {
        vi.mocked(usePartida).mockReturnValue({
            ...mockPartidaContext,
            turno_actual: { id: 123, nombre: "Jugador 1" },
            jugador: { id: 123, nombre: "Jugador 1" },
            partida: { id: 1, nombre: "Partida 1" },
        });

        vi.mocked(ObtenerInfoTurno).mockRejectedValue(
            new Error("Error de red")
        );

        render(<CardInfoDelTurno />);

        await waitFor(() => {
            expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
        });

        expect(mockShowToast).toHaveBeenCalledWith(
            "Error al obtener la información del turno"
        );
    });
});
