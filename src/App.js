import React, { useContext } from "react";
import "./App.scss";
import Routes from "common/Routes";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./styles/theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          {Object.keys(Routes).map((route) => {
            let component = Routes[route].component;
            return (
              <Route
                path={Routes[route].path}
                exact={true}
                key={Routes[route].path}
                component={component}
              />
            );
          })}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
