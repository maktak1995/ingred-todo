import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Detail as Component } from "./Detail";
import { deleteTodo } from "../../store/modules/todo/actions";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
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
