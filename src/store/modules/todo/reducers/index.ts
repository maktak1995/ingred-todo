import { reducerWithInitialState } from "typescript-fsa-reducers";
import { add_todo, update_todo, delete_todo } from "../actions";

type Todo = {
  id: number;
  content: string;
  finish: boolean;
};

export type TodoState = {
  todos: Todo[];
}

const initialState: TodoState = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') as string) : { todos: []};

let nextId = 0;

const updateTodo = (todos: Todo[], payload: Todo) => {
  const newTodos = todos.slice();
  const index = newTodos.findIndex((item: Todo) => item.id === payload.id);
  newTodos[index] = payload;
  return newTodos;
}

export const todoReducer = reducerWithInitialState(initialState)
  .case(add_todo, (state, payload) => ({
    ...state,
    todos: state.todos.concat({
      id: nextId++,
      content: payload,
      finish: false
    })
  }))
  .case(update_todo, (state, payload) => ({
    ...state,
    todos: updateTodo(state.todos, payload)
  }))
  .case(delete_todo, (state, payload) => ({
    ...state,
    todos: state.todos.filter(item => item.id !== payload)
  }))