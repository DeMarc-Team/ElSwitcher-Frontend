import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ButtonAbandonarPartida from "@/components/ButtonAbandonarPartida";
import { AbandonarPartida } from "@/services/api/abandonar_partida";
import { RemoveCurrentSession } from "@/services/session_browser";

vi.mock("@/services/api/abandonar_partida", () => ({
    AbandonarPartida: vi.fn(),
}));

vi.mock("@/services/session_browser", () => ({
    RemoveCurrentSession: vi.fn(),
}));

vi.mock("@/hook/useNotification", () => ({
    useNotification: vi.fn(),
}));

// Crear una referencia para el mock de `navigate`
const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock,
}));

describe("Componente ButtonAbandonarPartida", () => {
    test("Boton de abandonar partida", async () => {
        render(<ButtonAbandonarPartida idPartida={123} idJugador={321} />);

        expect(
            await screen.findByText("Abandonar Partida")
        ).toBeInTheDocument();

        // Simular el click en el botón "Abandonar Partida"
        await act(async () => {
            fireEvent.click(screen.getByText("Abandonar Partida"));
        });

        expect(
            await screen.findByText(
                "¿Estás seguro que deseas abandonar la partida?"
            )
        ).toBeInTheDocument();

        expect(await screen.findByText("Sí")).toBeInTheDocument();
        expect(await screen.findByText("No")).toBeInTheDocument();

        // Simular el click en el botón "Sí"
        await act(async () => {
            fireEvent.click(screen.getByText("Sí"));
        });

        // Verifico que se llamen a las funciones necesarias
        expect(AbandonarPartida).toHaveBeenCalledWith(123, 321);
        expect(RemoveCurrentSession).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith("/#listapartidas");
    });

    test("Verificamos el botón de cancelar", async () => {
        render(
            <ButtonAbandonarPartida
                idPartida={123}
                idJugador={321}
                owner_quiere_cancelar={true}
            />
        );

        expect(await screen.findByText("Cancelar Partida")).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(screen.getByText("Cancelar Partida"));
        });

        expect(
            await screen.findByText(
                "¿Estás seguro que deseas cancelar la partida?"
            )
        ).toBeInTheDocument();

        expect(await screen.findByText("Sí")).toBeInTheDocument();
        expect(await screen.findByText("No")).toBeInTheDocument();

        // Simular el click en el botón "Sí"
        await act(async () => {
            fireEvent.click(screen.getByText("Sí"));
        });

        // Verifico que se llamen a las funciones necesarias
        expect(AbandonarPartida).toHaveBeenCalledWith(123, 321);
        expect(RemoveCurrentSession).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith("/#listapartidas");
    });
});
