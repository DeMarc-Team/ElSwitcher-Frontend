import { describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Partidas from "@/containers/home/components/Partidas";
import { MemoryRouter } from "react-router-dom";

describe("Filtro de cantidad de jugadores", () => {
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
                { id: 4, nombre_partida: "2 jugadores" },
                { id: 5, nombre_partida: "200 veces" },
            ])
        ),
    }));
    
    vi.mock("@/services/api/obtener_info_partida", () => ({
        ObtenerInfoPartida: vi.fn((nombre_partida) => {
            if (nombre_partida === "Partida 1") {
                return Promise.resolve({
                    nombre_partida: "Partida 1",
                    nombre_creador: "Jugador 1",
                    id_creador: 123,
                    jugadores: [
                        { id_jugador: 123, nombre: "Jugador 1" },
                    ],
                    cantidad_jugadores: 1,
                    iniciada: false,
                });
            }
            if (nombre_partida === "2 jugadores") {
                return Promise.resolve({
                    nombre_partida: "2 jugadores",
                    nombre_creador: "Jugador 1",
                    id_creador: 123,
                    jugadores: [
                        { id_jugador: 123, nombre: "Jugador 1" },
                        { id_jugador: 125, nombre: "Jugador 2" },
                    ],
                    cantidad_jugadores: 2,
                    iniciada: false,
                });
            }
            if (nombre_partida === "200 veces") {
                return Promise.resolve({
                    nombre_partida: "200 veces",
                    nombre_creador: "Jugador 1",
                    id_creador: 123,
                    jugadores: [
                        { id_jugador: 123, nombre: "Jugador 1" },
                        { id_jugador: 125, nombre: "Jugador 2" },
                        { id_jugador: 127, nombre: "Jugador 3" },
                    ],
                    cantidad_jugadores: 3,
                    iniciada: false,
                });
            }
        }),
    }));
    
    test("Se renderiza la componente", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText("Cantidad de jugadores :")).toBeDefined();
            expect(screen.getByText("1 Jugador")).toBeDefined();
            expect(screen.getByText("2 Jugadores")).toBeDefined();
            expect(screen.getByText("3 Jugadores")).toBeDefined();
        });
    });

    test("No se aplicó ningun filtro", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.findByText("Partida 1")).toBeDefined();
            expect(screen.findByText("2 jugadores")).toBeDefined();
            expect(screen.findByText("200 veces")).toBeDefined();
        })
    });

    test("Filtro por un checkbox", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });
        
        const checkbox = screen.getByLabelText("1 Jugador");
    
        fireEvent.click(checkbox);
    
        await waitFor(() => {
            screen.queryByText("Partida 1")
        });
        expect(screen.queryByText("Partida 1")).toBeDefined();
        expect(screen.queryByText("2 jugadores")).toBeNull();
        expect(screen.queryByText("200 veces")).toBeNull();
    });
    

    test("Filtro por dos checkboxes", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    {" "}
                    <Partidas />
                </MemoryRouter>
            );
        });
        
        const checkbox1 = screen.getByLabelText("1 Jugador");
        const checkbox2 = screen.getByLabelText("2 Jugadores");

        fireEvent.click(checkbox1);
        fireEvent.click(checkbox2);

        await waitFor(() => {
            screen.queryByText("Partida 1")
            screen.queryByText("2 jugadores")
        });
        expect(screen.queryByText("200 veces")).toBeNull();
        
    });
});
