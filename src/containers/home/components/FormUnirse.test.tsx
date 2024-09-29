import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen} from "@testing-library/react";
import Partidas from "./Partidas";
import { BrowserRouter} from "react-router-dom";

describe("Form Unirse", () => {
    //Necesito una partida para probar el form
    vi.mock("@/services/api/obtener_partidas", () => ({
        ObtenerPartidas: vi.fn(() =>
            Promise.resolve([{ id: 1, nombre_partida: "Partida 1" }])
        ),
    }));

    test("Mocker las partidas y ver el form", async () => {
        render(
            <BrowserRouter>
                <Partidas />
            </BrowserRouter>
        );
        expect(await screen.findByText("Partida 1")).toBeDefined();

        //No se tiene que renderizar antes de ser llamado
        expect(screen.queryByLabelText("Nombre de Usuario")).toBeNull();

        //Simular el evento de clickear una partida
        const botonUnirsePartida = screen.getByText("Partida 1");
        fireEvent.click(botonUnirsePartida);

        //Corroborar que el formulario se abrió
        expect(screen.queryByLabelText("Unirse a la partida Partida 1")).not.toBeNull();

        //Obtener el campo de nombre
        const inputNombre = await screen.findByLabelText("Nombre de Usuario");
        expect(inputNombre).toBeDefined();

        //Verificar que no estoy abriendo el otro formulario
        expect(screen.queryByLabelText("Nombre de Partida")).not.toBeInTheDocument();

        // Simular la interacción del usuario llenando el formulario
        fireEvent.change(inputNombre, { target: { value: "Usuario Test" } });
        expect(inputNombre).not.toHaveValue("");

        // Simular el envío del formulario y click en "Unirse a Partida"
        const botonUnirse = screen.getByText("Unirse a partida");
        expect(botonUnirse).toBeInTheDocument();
    });
});



// ANOTACION
// getByLabelText: Lanza un error si el elemento no existe. Se usa cuando se espera que el elemento esté siempre presente.

// findByLabelText: Busca el elemento de manera asíncrona y espera un cierto tiempo hasta que el elemento aparezca en el DOM. 
// Lanza un error si no lo encuentra después de cierto tiempo.

// queryByLabelText: Devuelve null si el elemento no se encuentra. Se usa cuando el elemento podría no estar en el DOM, 
// como en los casos en que se necesita verificar la existencia o ausencia de un elemento.