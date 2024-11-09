import ButtonVolverAlHome from "@/components/ButtonVolverAlHome";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

const navigateMock = vi.fn(() => {});

vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(() => navigateMock),
}));

describe("ButtonVolverAlHome Component", () => {
    test("Se renderiza correctamente", () => {
        render(<ButtonVolverAlHome />);
        const button = screen.getByText("Volver al Inicio");
        expect(button).toBeInTheDocument();
    });

    test("Navega a '/#listapartidas' al hacer click", () => {
        render(<ButtonVolverAlHome />);
        const button = screen.getByText("Volver al Inicio");

        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledWith("/#listapartidas");
        expect(navigateMock).toHaveBeenCalledTimes(1);
    });
});
