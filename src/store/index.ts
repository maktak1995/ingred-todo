import { createStore } from "redux";
import { todoReducer, TodoState } from "./modules/todo/reducers";

export function configureStore() {
  const store = createStore(todoReducer);
  return store;
}

export type RootState = TodoState;