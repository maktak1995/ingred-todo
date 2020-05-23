import React from 'react';
import { configureStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SettingView } from "./pages/Setting";
import { ListView } from "./pages/List";
import './App.css';

const App: React.FunctionComponent = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <h1>Ingred-TODO</h1>
      <Router>
        <Route exact path="/" component={ListView}></Route>
        <Route path="/setting" component={SettingView}></Route>
      </Router>
    </Provider>
  );
};

export default App;