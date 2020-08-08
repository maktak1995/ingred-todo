import { Domain } from '../../../../types';

export const matchIdTodoSelector = (
  todos: Domain.Todo[],
  todoId: string,
): Domain.Todo => {
  return todos.find((todo) => todo.id === parseInt(todoId, 10)) as Domain.Todo;
};
