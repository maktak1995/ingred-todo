import { createStore, Store, AnyAction } from 'redux';
import { todoReducer, TodoState } from './modules/todo/reducers';

export function configureStore(): Store<TodoState, AnyAction> {
  const store = createStore(todoReducer);

  store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()));
  });

  return store;
}

export type RootState = TodoState;
