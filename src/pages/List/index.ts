import { connect } from "react-redux";
import { Dispatch } from "redux";
import { List as Component } from "./List";
import { addTodo, updateTodo } from "../../store/modules/todo/actions";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo: (title: string) => dispatch(addTodo(title)),
    updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
  };
};

export const ListView = connect(mapStateToProps, mapDispatchToProps)(Component);
