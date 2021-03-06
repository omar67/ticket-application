import "./App.css";
import { Switch, Route, HashRouter } from "react-router-dom";
import React from "react";
import Error404 from "./pages/404";
import Ticket from "./pages/ticket";
import Home from "./pages/home";
import AccessControl from "./pages/access-control/AccessControl";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <HashRouter basename="ticket-application">
            <Switch>
              <Route path="/" exact="true">
                <Home />
              </Route>
              <Route path="/login">
                <AccessControl tab={"login"} />
              </Route>
              <Route path="/register">
                <AccessControl tab={"register"} />
              </Route>
              <Route path="/ticket/:id">
                <Ticket />
              </Route>
              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
          </HashRouter>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
