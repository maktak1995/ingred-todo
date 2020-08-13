import { Domain } from '../../../../types';

export const matchIdTodoSelector = (
  todos: Domain.Todo[],
  todoId: string,
): Domain.Todo => {
  return todos.find((todo) => Object.keys(todo)[0] === todoId) as Domain.Todo;
};
