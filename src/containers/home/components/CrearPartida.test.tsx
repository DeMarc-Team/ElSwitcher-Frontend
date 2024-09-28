import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import { describe,test,expect } from 'vitest';
import CrearPartida from './CrearPartida';
import '@testing-library/jest-dom';


describe('Crear Partida', () => {
  test('Se renderiza el botón de crear partida', async () => {
    render(
      <BrowserRouter>
        <CrearPartida />
      </BrowserRouter>
    );
    expect(screen.getByText('Crear Partida')).toBeDefined();
  });

  test("Se debería mostrar el formulario al presionar 'Crear Partida' y permitir llenarlo correctamente", () => {
    render(
      <BrowserRouter>
        <CrearPartida />
      </BrowserRouter>
    );

    // Verificar que el formulario no se muestra inicialmente
    expect(screen.queryByLabelText("Nombre de Usuario")).toBeNull();

    // Simular el clic en el botón "Crear Partida"
    const botonCrearPartida = screen.getByText("Crear Partida");
    fireEvent.click(botonCrearPartida);

    // Verificar que ahora el formulario aparece
    expect(screen.getByLabelText("Crear Nueva Partida !!")).not.toBeNull();
    //Obtener los campos de input
    const inputPartida = screen.getByLabelText("Nombre de Partida");
    const inputNombre = screen.getByLabelText("Nombre de Usuario");

    // Simular la interacción del usuario llenando el formulario
    fireEvent.change(inputPartida, { target: { value: "Partida Test" } });
    fireEvent.change(inputNombre, { target: { value: "Usuario Test" } });

    // Los campos no deberían de estar vacios
    expect(inputNombre).not.toHaveValue("");
    expect(inputPartida).not.toHaveValue("");

    // Simular el envío del formulario y click en "Unirse a Partida"
    const botonUnirse = screen.getByText("Unirse a Partida");
    fireEvent.click(botonUnirse);
  });
});
