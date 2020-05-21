import React from "react";
import { AddPyload, UpdatePyload, DeletePyload } from "../../store/modules/todo/actions";

type Todo = {
  id: number;
  content: string;
  finish: boolean;
};

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
  addTodo: (payload: AddPyload) => void;
}

export const TodoView: React.FunctionComponent<Props> = ({
  todos,
  updateTodo,
  deleteTodo,
  addTodo
}) => {
  const [content, setContent] = React.useState('');
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
      <p>
        <input
          type="text"
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={() => addTodo(content)}>add</button>
      </p>
    </div>
  );
};