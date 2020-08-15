import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { setTodos } from '../actions';
import { Domain } from '../../../../types';

export type TodoState = {
  todos: Domain.Todo[];
};

const initialState: TodoState = { todos: [] };

export const todoReducer = reducerWithInitialState(initialState).case(
  setTodos,
  (state, payload) => ({
    ...state,
    todos: payload,
  }),
);
