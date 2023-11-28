import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem } from '../../src/08-useReducer/TodoItem';

describe('Pruebas en <TodoItem />', () => {
	const todo = {
		id: 1,
		description: 'Piedra del Alma',
		done: false,
	};

	const onDeleteTodoMock = jest.fn();
	const onToggleTodoMock = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrar el TODO Pendiente de completar', () => {
		render(
			<TodoItem
				todo={todo}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>,
		);

		const liElement = screen.getByRole('listitem');
		expect(liElement.className).toBe(
			'list-group-item d-flex justify-content-between',
		);

		const spanElement = screen.getByLabelText('span');
		expect(spanElement.className).toContain('align-self-center');
		expect(spanElement.className).not.toContain('text-decoration-line-through');
	});

	test('Debe de mostrar el TODO completado', () => {
		todo.done = true;

		render(
			<TodoItem
				todo={todo}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>,
		);

		const spanElement = screen.getByLabelText('span');
		expect(spanElement.className).toContain('text-decoration-line-through');
	});

	test('El span debe de llamar el ToggleTodo cuando se hace click', () => {
		render(
			<TodoItem
				todo={todo}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>,
		);

		const spanElement = screen.getByLabelText('span');
		fireEvent.click(spanElement);

		expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);
	});

	test('El button debe de llamar el deleteTodo', () => {
		render(
			<TodoItem
				todo={todo}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>,
		);

		const deleteButton = screen.getByRole('button');
		fireEvent.click(deleteButton);

		expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
	});
});
