import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { List as Component } from './List';
import {
  addTodo,
  updateTodo,
  deleteTodo,
} from '../../store/modules/todo/actions';
import { RootState } from '../../store';
import { Domain } from '../../types';

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo: (title: string) => dispatch(addTodo(title)),
    updateTodo: (todo: Domain.Todo) => dispatch(updateTodo(todo)),
    deleteTodo: (id: number) => dispatch(deleteTodo(id)),
  };
};

export const ListView = connect(mapStateToProps, mapDispatchToProps)(Component);
