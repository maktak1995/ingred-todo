import { connect } from "react-redux";
import { Dispatch } from "redux";
import { TodoView as Component } from "./TodoView";
import { add_todo, update_todo, delete_todo } from "../../store/modules/todo/actions";
import { RootState } from "../../store";

type Todo = {
  id: number;
  content: string;
  finish: boolean;
};

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    add_todo: (content: string) => dispatch(add_todo(content)),
    delete_todo: (id: number) => dispatch(delete_todo(id)),
    update_todo: (todo: Todo) => dispatch(update_todo(todo)),
  };
};

export const TodoView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);