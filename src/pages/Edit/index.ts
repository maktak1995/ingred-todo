import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Edit as Component } from "./Edit";
import { updateTodo } from "../../store/modules/todo/actions";
import { matchIdTodoSelector } from "../../store/modules/todo/selectors";
import { RootState } from "../../store";

type Props = {
  todos: Todo[];
} & RouteComponentProps<{ todoId: string }>;

const mapStateToProps = (state: RootState, props: Props) => {
  return {
    todo: matchIdTodoSelector(state.todos, props.match.params.todoId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
  };
};

export const EditView = connect(mapStateToProps, mapDispatchToProps)(Component);
