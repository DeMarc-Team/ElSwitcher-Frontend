import { describe,expect, test} from 'vitest'
import { render, screen} from '@testing-library/react';
import Partidas from './Partidas';

describe('Partidas Component', () => {
    test('Se renderiza la lista de partidas', () => {
        render(<Partidas />);
        expect(screen.getByText('Lista de partidas:')).toBeDefined();
    });
});



// test('', () => {
//   })