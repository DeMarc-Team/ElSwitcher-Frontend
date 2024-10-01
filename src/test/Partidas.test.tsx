import { describe, expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Partidas from "../containers/home/components/Partidas";
import { MemoryRouter } from "react-router-dom";

describe("Partidas Component", () => {
   

    test("Se renderiza la lista de partidas", async () => {
        vi.mock("@/services/api/obtener_partidas", () => ({
            ObtenerPartidas: vi.fn(() => Promise.resolve([])),
        }));
        await act(async () => {
            render(
                <MemoryRouter>   {/* Envuelve el componente en un MemoryRouter */}
                    <Partidas />
                </MemoryRouter>
            );
        });
        expect(screen.getByText("Lista de partidas")).toBeDefined();
    });
    
    test("No hay partidas", async () => {
        vi.mock("@/services/api/obtener_partidas", () => ({
            ObtenerPartidas: vi.fn(() => Promise.resolve([])),
        }));
        await act(async () => {
            render(
                <MemoryRouter>   {/* Envuelve el componente en un MemoryRouter */}
                    <Partidas />
                </MemoryRouter>
            );
        });
        expect(screen.findByText("No hay partidas creadas.")).toBeDefined();
    });

    

    test("Mocker las partidas", async () => {
        vi.mock("@/services/api/obtener_partidas", () => ({
            ObtenerPartidas: vi.fn(() =>
                Promise.resolve([
                    { id: 1, nombre_partida: "Partida 1" },
                    { id: 2, nombre_partida: "Partida 2" },
                ])
            ),
        }));
        //Simular la navegación pues partidas llama a FormUnirse
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });
        expect(await screen.findByText("Partida 1")).toBeDefined();
        expect(await screen.findByText("Partida 2")).toBeDefined();
    });
});
