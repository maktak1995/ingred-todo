import React from "react";
import * as Styled from "./AppStyle";
import { ThemeProvider, createTheme, Typography, Spacer } from "ingred-ui";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { EditView } from "./pages/Edit";
import { DetailView } from "./pages/Detail";
import { ListView } from "./pages/List";

const App: React.FunctionComponent = () => {
  const store = configureStore();
  const theme = createTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Styled.Container>
          <Router>
            <Spacer p={2}>
              <Typography component="h1" size="xxxxl">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: `${theme.palette.text.primary}`,
                  }}
                >
                  Ingred-TODO
                </Link>
              </Typography>
            </Spacer>

            <Spacer p={2}>
              <Route exact path="/" component={ListView}></Route>
              <Route path="/detail/:todoId" component={DetailView}></Route>
              <Route path="/edit/:todoId" component={EditView}></Route>
            </Spacer>
          </Router>
        </Styled.Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
