import React from "react";
import { AddPyload, DeletePyload, UpdatePyload　} from "../../store/modules/todo/actions";

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
  addTodo: (payload: AddPyload) => void;
}

export const List: React.FunctionComponent<Props> = ({
  todos,
  updateTodo,
  deleteTodo,
  addTodo
}) => {
  const [content, setContent] = React.useState('');
  console.log(todos);
  return (
    <div>
      <table>
        <tbody>
          {todos.map(item =>
            <tr key={item.id}>
              <th>{item.finish && "✔"}</th>
              <th>{item.content}</th>
              <th>
                <button onClick={() => updateTodo({ ...item, finish: true })}>done</button>
              </th>
              <th>
                <button onClick={() => deleteTodo(item.id)}>delete</button>
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