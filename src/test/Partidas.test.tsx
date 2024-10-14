import { describe, expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Partidas from "../containers/home/components/Partidas";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/services/websockets/websockets", () => ({
    useCustomWebSocket: vi.fn(() => ({
        message: {
            action: "",
        },
        readyState: true,
        openConnection: vi.fn(),
        closeConnection: vi.fn(),
    })),
}));

vi.mock("@/services/websockets/websockets_lista_partidas", () => ({
    useWebSocketListaPartidas: vi.fn(() => ({
        message: null,
        readyState: 1,
        closeConnection: vi.fn(),
        openConnectionToPartida: vi.fn(),
        triggerActualizarSalaEspera: false,
        triggerActualizarTurno: false,
    })),
}));

vi.mock("@/services/api/obtener_partidas", () => ({
    ObtenerPartidas: vi.fn(() =>
        Promise.resolve([
            { id: 1, nombre_partida: "Partida 1" },
            { id: 2, nombre_partida: "Partida 2" },
        ])
    ),
}));

describe("Partidas Component", () => {
    test("Se renderiza la lista de partidas", async () => {
        vi.mock("@/services/api/obtener_partidas", () => ({
            ObtenerPartidas: vi.fn(() => Promise.resolve([])),
        }));
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });
        expect(screen.getByText("Lista de partidas")).toBeDefined();
    });

    test("Mocker las partidas", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });

        expect(await screen.queryAllByText(/Partida 1/i)).toBeDefined();
        expect(await screen.queryAllByText(/Partida 2/i)).toBeDefined();
    });

    test("No hay partidas", async () => {
        vi.mock("@/services/api/obtener_partidas", () => ({
            ObtenerPartidas: vi.fn(() => Promise.resolve([])),
        }));
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });
        expect(screen.findByText("No hay partidas creadas.")).toBeDefined();
    });
});
