import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { List as Component } from './List';
import { setTodos } from '../../store/modules/todo/actions';
import { RootState } from '../../store';
import { Domain } from '../../types';

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setTodos: (todos: Domain.Todo[]) => dispatch(setTodos(todos)),
  };
};

export const ListView = connect(mapStateToProps, mapDispatchToProps)(Component);
