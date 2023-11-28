import { TodoAdd, TodoList } from './';
import { useTodos } from '../hooks';

export const TodoApp = () => {
	const {
		todos,
		handleNewTodo,
		handleDeleteTodo,
		handleToggleTodo,
		todosCount,
		pendingTodosCount,
	} = useTodos();

	return (
		<>
			<h1>
				TodoApp {todosCount}
				<small> pentientes: {pendingTodosCount}</small>
			</h1>
			<hr />

			<div className='row'>
				<div className='col-7'>
					<TodoList
						todos={todos}
						onDeleteTodo={handleDeleteTodo}
						onToggleTodo={handleToggleTodo}
					/>
				</div>
				<div className='col-5'>
					<h4>Agregar TODO</h4>
					<hr />
					<TodoAdd onNewTodo={handleNewTodo} />
				</div>
			</div>
		</>
	);
};
