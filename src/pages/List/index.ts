import { connect } from "react-redux";
import { Dispatch } from "redux";
import { List as Component } from "./List";
import { add_todo, update_todo, delete_todo } from "../../store/modules/todo/actions";
import { RootState } from "../../store";

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

export const ListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);