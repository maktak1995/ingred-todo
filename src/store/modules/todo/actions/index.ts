import actionCreaterFactory from 'typescript-fsa';
import { Domain } from '../../../../types';

const actionCreator = actionCreaterFactory('todo');

export type SetPyload = Domain.Todo[];
export const setTodos = actionCreator<SetPyload>('SET_TODOS');
