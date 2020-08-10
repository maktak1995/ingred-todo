import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addTodo, updateTodo, deleteTodo } from '../actions';
import { Domain } from '../../../../types';

export type TodoState = {
  nextId: number;
  todos: Domain.Todo[];
};

const initialState: TodoState = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos') as string)
  : { nextId: 0, todos: [] };

const handleUpdateTodo = (todos: Domain.Todo[], payload: Domain.Todo) => {
  const newTodos = todos.slice();
  const index = newTodos.findIndex(
    (item: Domain.Todo) => item.id === payload.id,
  );
  newTodos[index] = payload;
  return newTodos;
};

export const todoReducer = reducerWithInitialState(initialState)
  .case(addTodo, (state, payload) => ({
    ...state,
    nextId: state.nextId + 1,
    todos: state.todos.concat({
      id: state.nextId,
      title: payload,
      isFinished: false,
    }),
  }))
  .case(updateTodo, (state, payload) => ({
    ...state,
    todos: handleUpdateTodo(state.todos, payload),
  }))
  .case(deleteTodo, (state, payload) => ({
    ...state,
    todos: state.todos.filter((item) => item.id !== payload),
  }));
