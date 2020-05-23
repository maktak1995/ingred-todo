import React from "react";
import { UpdatePyload, DeletePyload } from "../../store/modules/todo/actions";

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
}

export const Setting: React.FunctionComponent<Props> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  return (
    <div>
      <table>
        <tbody>
          {todos.map(item =>
            <tr key={item.id}>
              <th>{item.finish && "✔"}</th>
              <th>{item.content}</th>
              <th>
                <button onClick={() => deleteTodo(item.id)}>delete</button>
              </th>
              <th>
                <button onClick={() => updateTodo({ ...item, finish: true })}>done</button>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};