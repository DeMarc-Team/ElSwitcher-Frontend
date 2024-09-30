import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Partidas from "../containers/home/components/Partidas";
import { MemoryRouter } from "react-router-dom";

describe("Partidas Component", () => {
    test("Se renderiza la lista de partidas", () => {
        render(<Partidas />);
        expect(screen.getByText("Lista de partidas")).toBeDefined();
    });

    vi.mock("@/services/api/obtener_partidas", () => ({
        ObtenerPartidas: vi.fn(() => Promise.resolve([])),
    }));

    test("No hay partidas", async () => {
        render(<Partidas />);
        expect(
            await screen.getByText("No hay partidas creadas.")
        ).toBeDefined();
    });

    vi.mock("@/services/api/obtener_partidas", () => ({
        ObtenerPartidas: vi.fn(() =>
            Promise.resolve([
                { id: 1, nombre_partida: "Partida 1" },
                { id: 2, nombre_partida: "Partida 2" },
            ])
        ),
    }));

    test("Mocker las partidas", async () => {
        //Simular la navegación pues partidas llama a FormUnirse
        render(
            <MemoryRouter>
                <Partidas />
            </MemoryRouter>
        );
        expect(await screen.findByText("Partida 1")).toBeDefined();
        expect(await screen.findByText("Partida 2")).toBeDefined();
    });
});
