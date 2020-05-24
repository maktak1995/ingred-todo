import React from "react";
import * as Styled from "./AppStyle";
import { ThemeProvider, createTheme, Typography, Spacer } from "ingred-ui";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SettingView } from "./pages/Setting";
import { ListView } from "./pages/List";

const App: React.FunctionComponent = () => {
  const store = configureStore();
  const theme = createTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Styled.Container>
          <Router>
            <Styled.TitleContainer>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography component="h1" size="xxxxl">
                  Ingred-TODO
                </Typography>
              </Link>
            </Styled.TitleContainer>
            <Spacer pb={1} />
            <Route exact path="/" component={ListView}></Route>
            <Route path="/setting/:todoId" component={SettingView}></Route>
          </Router>
        </Styled.Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
