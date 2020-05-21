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
    addTodo: (content: string) => dispatch(add_todo(content)),
    deleteTodo: (id: number) => dispatch(delete_todo(id)),
    updateTodo: (todo: Todo) => dispatch(update_todo(todo)),
  };
};

export const TodoView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);