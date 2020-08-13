import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { setTodos, addTodo, updateTodo, deleteTodo } from '../actions';
import { Domain } from '../../../../types';
import { firebaseDb } from '../../../../infra/firebase';

export type TodoState = {
  todos: Domain.Todo[];
};

const initialState: TodoState = { todos: [] };

export const todoReducer = reducerWithInitialState(initialState)
  .case(setTodos, (state, payload) => ({
    ...state,
    todos: payload,
  }))
  .case(addTodo, (state, payload) => {
    const { key } = firebaseDb.ref('todos').push({
      title: payload,
      isFinished: false,
    });
    return { ...state, [key as string]: { title: payload, isFinished: false } };
  })
  .case(updateTodo, (state, payload) => {
    const key = Object.keys(payload)[0];
    firebaseDb.ref(`todos/${key}`).update({
      title: payload[key].title,
      isFinished: payload[key].isFinished,
    });
    return {
      ...state,
      [key]: { title: payload.title, isFinished: payload.isFinished },
    };
  })
  .case(deleteTodo, (state, payload) => {
    firebaseDb.ref(`todos/${payload}`).remove();
    return {
      ...state,
      todos: state.todos.filter((item) => Object.keys(item)[0] === payload),
    };
  });
