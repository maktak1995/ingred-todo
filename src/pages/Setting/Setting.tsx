import React from "react";
import * as Styled from "./styled";
import { UpdatePyload, DeletePyload } from "../../store/modules/todo/actions";
import { RouteComponentProps } from "react-router-dom";

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
} & RouteComponentProps<{ todoId: string }>;

export const Setting: React.FunctionComponent<Props> = ({
  match,
  todos,
  updateTodo,
  deleteTodo,
}) => {
  const todo = todos.find((todo) => todo.id === parseInt(match.params.todoId));
  return (
    <Styled.Container>
      <table>
        <tbody>
          {todo && (
            <tr key={todo.id}>
              <th>{todo.finish && "✔"}</th>
              <th>{todo.title}</th>
              <th>
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
              </th>
              <th>
                <button onClick={() => updateTodo({ ...todo, finish: true })}>
                  done
                </button>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </Styled.Container>
  );
};
