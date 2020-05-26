export const matchIdTodoSelector = (todos: Todo[], todoId: string): Todo => {
  return todos.find((todo) => todo.id === parseInt(todoId)) as Todo;
};
