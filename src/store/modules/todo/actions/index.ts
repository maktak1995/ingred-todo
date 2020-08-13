import actionCreaterFactory from 'typescript-fsa';
import { Domain } from '../../../../types';

const actionCreator = actionCreaterFactory('todo');

export type SetPyload = Domain.Todo[];
export const setTodos = actionCreator<SetPyload>('SET_TODOS');

export type AddPyload = string;
export const addTodo = actionCreator<AddPyload>('ADD_TODO');

export type DeletePyload = string;
export const deleteTodo = actionCreator<DeletePyload>('DELETE_TODO');

export type UpdatePyload = Domain.Todo;
export const updateTodo = actionCreator<UpdatePyload>('UPDATE_TODO');
