import { todoReducer } from '../../src/08-useReducer/todoReducer';

describe('Pruebas en todoReducer', () => {
	const initialState = [
		{
			id: 1,
			description: 'Demo todo',
			done: false,
		},
	];

	test('Debe de regresarel estado inicial', () => {
		const newState = todoReducer(initialState, {});
		expect(newState).toBe(initialState);
	});

	test('Debe de regresar un TODO', () => {
		const action = {
			type: '[TODO] Add Todo',
			payload: {
				id: 2,
				description: 'Nuevo toto #2',
				done: false,
			},
		};

		const newState = todoReducer(initialState, action);
		expect(newState.length).toBe(2);
		expect(newState).toContain(action.payload);
	});

	test('Debe de eliminar un TODO', () => {
		const action = {
			type: '[TODO] Remove Todo',
			payload: 1,
		};

		const newState = todoReducer(initialState, action);
		expect(newState.length).toBe(0);
	});

	test('Debe de realizar el Toggle del TODO', () => {
		const action = {
			type: '[TODO] Toggle Todo',
			payload: 1,
		};

		const newStateTruthy = todoReducer(initialState, action);
		expect(newStateTruthy[0].done).toBeTruthy();

		const newStateFalsy = todoReducer(newStateTruthy, action);
		expect(newStateFalsy[0].done).toBeFalsy();
	});
});
