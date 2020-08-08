import actionCreaterFactory from 'typescript-fsa';
import { Domain } from '../../../../types';

const actionCreater = actionCreaterFactory('todo');

export type AddPyload = string;
export const addTodo = actionCreater<AddPyload>('ADD_TODO');

export type DeletePyload = number;
export const deleteTodo = actionCreater<DeletePyload>('DELETE_TODO');

export type UpdatePyload = Domain.Todo;
export const updateTodo = actionCreater<UpdatePyload>('UPDATE_TODO');
