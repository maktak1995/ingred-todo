import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Edit as Component } from "./Edit";
import { updateTodo } from "../../store/modules/todo/actions";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
  };
};

export const EditView = connect(mapStateToProps, mapDispatchToProps)(Component);
