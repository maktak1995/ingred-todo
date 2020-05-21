import React from 'react';
import { configureStore } from "./store";
import { Provider } from "react-redux";
import { TodoView } from "./pages/TodoView";
import './App.css';

const App: React.FunctionComponent = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <TodoView />
    </Provider>
  );
};

export default App;