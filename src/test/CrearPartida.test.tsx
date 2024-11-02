import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import CrearPartida from "../containers/home/components/CrearPartida";
import "@testing-library/jest-dom";
import {
    CrearPartidaForm,
    CrearPartidaResponse,
} from "@/services/api/crear_partida";

describe("Crear Partida", () => {
    vi.mock("@/services/api/crear_partida", () => ({
        crearPartida: vi.fn(
            (form: CrearPartidaForm): Promise<CrearPartidaResponse> =>
                Promise.resolve({
                    id: 1,
                    nombre_partida: "Partida 1",
                    nombre_creador: "Jugador 1",
                    id_creador: 123,
                })
        ),
    }));

    test("Se renderiza el botón de crear partida", async () => {
        render(
            <BrowserRouter>
                <CrearPartida />
            </BrowserRouter>
        );
        expect(screen.getByText("Crear Partida")).toBeDefined();
    });

    test("Se debería mostrar el formulario al presionar 'Crear Partida' y permitir llenarlo correctamente, caso de partida pública", async () => {
        render(
            <BrowserRouter>
                <CrearPartida />
            </BrowserRouter>
        );

        // Verificar que el formulario no se muestra inicialmente
        expect(screen.queryByLabelText("Nombre de Usuario")).toBeNull();

        await act(async () => {
            // Simular el clic en el botón "Crear Partida"
            const botonCrearPartida = screen.getByText("Crear Partida");
            fireEvent.click(botonCrearPartida);
        });

        // Verificar que ahora el formulario aparece
        expect(screen.getByLabelText("Crear Nueva Partida !!")).not.toBeNull();
        expect(screen.getByLabelText("¿Habilitar Contraseña?")).not.toBeNull();
        //Obtener los campos de input
        const inputPartida = screen.getByLabelText("Nombre de Partida");
        const inputNombre = screen.getByLabelText("Nombre de Usuario");
        const checkboxPassword = screen.getByLabelText("¿Habilitar Contraseña?");

        // Simular la interacción del usuario llenando el formulario
        fireEvent.change(inputPartida, { target: { value: "Partida Test" } });
        fireEvent.change(inputNombre, { target: { value: "Usuario Test" } });

        // Los campos no deberían de estar vacios pero el checkbox si
        expect(inputNombre).not.toHaveValue("");
        expect(inputPartida).not.toHaveValue("");
        expect(checkboxPassword).not.toBeChecked();

        // Simular el envío del formulario y click en "Unirse a Partida"
        const botonUnirse = screen.getByText("Unirse a Partida");
        await act(async () => {
            fireEvent.click(botonUnirse);
        });
    });

    test("Se debería mostrar el formulario al presionar 'Crear Partida' y permitir llenarlo correctamente, caso de partida privada", async () => {
        render(
            <BrowserRouter>
                <CrearPartida />
            </BrowserRouter>
        );

        // Verificar que el formulario no se muestra inicialmente
        expect(screen.queryByLabelText("Nombre de Usuario")).toBeNull();

        await act(async () => {
            // Simular el clic en el botón "Crear Partida"
            const botonCrearPartida = screen.getByText("Crear Partida");
            fireEvent.click(botonCrearPartida);
        });

        // Verificar que ahora el formulario aparece
        expect(screen.getByLabelText("Crear Nueva Partida !!")).not.toBeNull();
        expect(screen.getByLabelText("¿Habilitar Contraseña?")).not.toBeNull();
        //Obtener los campos de input
        const inputPartida = screen.getByLabelText("Nombre de Partida");
        const inputNombre = screen.getByLabelText("Nombre de Usuario");
        const checkboxPassword = screen.getByLabelText("¿Habilitar Contraseña?");
        

        // Simular la interacción del usuario llenando el formulario
        fireEvent.change(inputPartida, { target: { value: "Partida Test" } });
        fireEvent.change(inputNombre, { target: { value: "Usuario Test" } });
        fireEvent.click(checkboxPassword);
        const visiblePasswordInput = screen.queryByLabelText("Contraseña");
        if (visiblePasswordInput) {
            fireEvent.change(visiblePasswordInput, { target: { value: "password123" } });
            expect(visiblePasswordInput).toHaveValue("password123");
        }

        // Los campos no deberían de estar vacios y el checkbox debería de estar clickeado
        expect(inputNombre).not.toHaveValue("");
        expect(inputPartida).not.toHaveValue("");
        expect(checkboxPassword).toBeChecked();

        // Simular el envío del formulario y click en "Unirse a Partida"
        const botonUnirse = screen.getByText("Unirse a Partida");
        await act(async () => {
            fireEvent.click(botonUnirse);
        });
    });
});
