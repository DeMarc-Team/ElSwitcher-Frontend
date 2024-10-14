import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Partidas from "../containers/home/components/Partidas";
import { BrowserRouter } from "react-router-dom";

    //Necesito una partida para probar el form
vi.mock("@/services/api/obtener_partidas", () => ({
    ObtenerPartidas: vi.fn(() =>
        Promise.resolve([{ id: 1, nombre_partida: "Partida 1" }])
    ),
}));

vi.mock("@/services/api/obtener_info_partida", () => ({
    ObtenerInfoPartida: vi.fn(() => {
            return Promise.resolve({
                nombre_partida: "Partida 1",
                nombre_creador: "Jugador 1",
                id_creador: 123,
                jugadores: [
                    { id_jugador: 123, nombre: "Jugador 1" },
                    { id_jugador: 125, nombre: "Jugador 2" },
                ],
                cantidad_jugadores: 2,
                iniciada: false,
            });
        })
}));

vi.mock("@/services/api/unirse_partida", () => ({
    UnirsePartida: vi.fn(() => Promise.resolve()),
}));

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

describe("Form Unirse", () => {
    test("Mocker las partidas y ver el form", async () => {
        render(
            <BrowserRouter>
                <Partidas />
            </BrowserRouter>
        );

        //No se tiene que renderizar antes de ser llamado
        expect(screen.queryByLabelText("Nombre de Usuario")).toBeNull();

        await waitFor(() => {
            expect(screen.queryByText("Partida 1")).toBeDefined();
        });
        //Simular el evento de clickear una partida
        const botonUnirsePartida = screen.findByText("Partida 1");
        fireEvent.click(await botonUnirsePartida);

        //Corroborar que el formulario se abrió
        expect(
            screen.queryByLabelText("Unirse a la partida Partida 1")
        ).not.toBeNull();

        //Obtener el campo de nombre
        const inputNombre = await screen.findByLabelText("Nombre de Usuario");
        expect(inputNombre).toBeDefined();

        //Verificar que no estoy abriendo el otro formulario
        expect(
            screen.queryByLabelText("Nombre de Partida")
        ).not.toBeInTheDocument();

        // Simular la interacción del usuario llenando el formulario
        fireEvent.change(inputNombre, { target: { value: "Usuario Test" } });
        expect(inputNombre).not.toHaveValue("");

        // Simular el envío del formulario y click en "Unirse a Partida"
        const botonUnirse = screen.getByText("Unirse a partida");
        expect(botonUnirse).toBeInTheDocument();
    });
});
