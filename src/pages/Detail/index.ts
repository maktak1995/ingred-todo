import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Detail as Component } from "./Detail";
import { deleteTodo } from "../../store/modules/todo/actions";
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
    deleteTodo: (id: number) => dispatch(deleteTodo(id)),
  };
};

export const DetailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
