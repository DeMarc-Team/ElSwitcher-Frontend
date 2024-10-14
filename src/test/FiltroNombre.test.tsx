import { describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Partidas from "@/containers/home/components/Partidas";
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

vi.mock("@/services/api/obtener_partidas", () => ({
    ObtenerPartidas: vi.fn(() =>
        Promise.resolve([
            { id: 1, nombre_partida: "Partida 1" },
            { id: 2, nombre_partida: "Partida 2" },
            { id: 3, nombre_partida: "Partida 3" },
            { id: 4, nombre_partida: "2 Jugadores" },
            { id: 5, nombre_partida: "200 veces" },
        ])
    ),
}));

describe("Filtro de nombre de partidas", () => {
    test("Se renderiza la componente", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });
        
        expect(screen.getByPlaceholderText("Filtrar por nombre")).toBeDefined();
    });

    test("No se aplicó ningun filtro", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });
        expect(await screen.findByText("Partida 1")).toBeDefined();
        expect(await screen.findByText("Partida 2")).toBeDefined();
        expect(await screen.findByText("Partida 3")).toBeDefined();
        expect(await screen.findByText("2 Jugadores")).toBeDefined();
        expect(await screen.findByText("200 veces")).toBeDefined();
    });

    test("Filtro por nombre exacto", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });

        const input = screen.getByPlaceholderText("Filtrar por nombre");
        fireEvent.change(input, { target: { value: "Partida 1" } });

        await waitFor(() => {
            expect(screen.queryByText("Partida 1")).toBeDefined();
        });

        await waitFor(() => {
            expect(screen.queryByText("Partida 2")).toBeNull();
            expect(screen.queryByText("Partida 3")).toBeNull();
            expect(screen.queryByText("2 Jugadores")).toBeNull();
            expect(screen.queryByText("200 veces")).toBeNull();
        });
    });

    test("Filtro parcial por nombre", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });
    
        const input = screen.getByPlaceholderText("Filtrar por nombre") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "Partida" } });
    
        await waitFor(() => {
            expect(screen.queryByText("Partida 1")).toBeDefined();
            expect(screen.queryByText("Partida 2")).toBeDefined();
            expect(screen.queryByText("Partida 3")).toBeDefined();
            expect(screen.queryByText("2 Jugadores")).toBeNull();
            expect(screen.queryByText("200 veces")).toBeNull();
        });
    });
    
    test("Filtro por número en el nombre", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });
    
        const input = screen.getByPlaceholderText("Filtrar por nombre") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "2" } });
    
        await waitFor(() => {
            expect(screen.queryByText("2 Jugadores")).toBeDefined();
            expect(screen.queryByText("200 veces")).toBeDefined();
            expect(screen.queryByText("Partida 2")).toBeDefined();
            expect(screen.queryByText("Partida 1")).toBeNull();
            expect(screen.queryByText("Partida 3")).toBeNull();
        });
    });
    
    test("Filtro sin coincidencias", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Partidas />
                </MemoryRouter>
            );
        });
    
        const input = screen.getByPlaceholderText("Filtrar por nombre") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "No existe" } });
    
        await waitFor(() => {
            expect(screen.queryByText("Partida 1")).toBeNull();
            expect(screen.queryByText("Partida 2")).toBeNull();
            expect(screen.queryByText("Partida 3")).toBeNull();
            expect(screen.queryByText("2 Jugadores")).toBeNull();
            expect(screen.queryByText("200 veces")).toBeNull();
        });
    });
    
});
