import { fireEvent, render, screen } from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-example';
import { useFetch } from '../../src/hooks/useFetch';
import { useCounter } from '../../src/hooks/useCounter';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => {
	const mockIncrement = jest.fn();
	useCounter.mockReturnValue({
		couter: 1,
		increment: mockIncrement,
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Debe de mostrar el componente por defecto', () => {
		useFetch.mockReturnValue({
			data: null,
			isLoading: true,
			hasError: null,
		});

		render(<MultipleCustomHooks />);

		expect(screen.getByText('Loading...'));
		expect(screen.getByText('Rick and Morty Characters'));

		const nextButton = screen.getByRole('button', { name: 'Next character' });
		expect(nextButton.disabled).toBeTruthy();
		// screen.debug();
	});

	test('Debe de mostrar un Character', () => {
		useFetch.mockReturnValue({
			data: {
				name: 'Jorge',
				species: 'Humano',
				image: 'http//:mi-imagen/imagen.jpg',
				status: 'Vivo',
				gender: 'Hombre',
			},
			isLoading: false,
			hasError: null,
		});

		render(<MultipleCustomHooks />);
		expect(screen.getByText('Jorge')).toBeTruthy();
		expect(screen.getByText('Humano / Hombre')).toBeTruthy();

		const { srcset, alt } = screen.getByRole('img');
		expect(srcset).toBe('http//:mi-imagen/imagen.jpg');
		expect(alt).toBe('Jorge');

		expect(screen.getByText('Vivo')).toBeTruthy();

		const nextButton = screen.getByRole('button', { name: 'Next character' });
		expect(nextButton.disabled).toBeFalsy();
		// screen.debug();
	});

	test('Debe de llamar la función de incrementar', () => {
		useFetch.mockReturnValue({
			data: {
				name: 'Jorge',
				species: 'Humano',
				image: 'http//:mi-imagen/imagen.jpg',
				status: 'Vivo',
				gender: 'Hombre',
			},
			isLoading: false,
			hasError: null,
		});

		render(<MultipleCustomHooks />);
		const nextButton = screen.getByRole('button', { name: 'Next character' });
		fireEvent.click(nextButton);

		expect(mockIncrement).toHaveBeenCalled();
	});
});
