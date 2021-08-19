import "./App.css";
import { Switch, Route, HashRouter } from "react-router-dom";
import React from "react";
import Error404 from "./pages/404";
import Ticket from "./pages/ticket";
import Home from "./pages/home";
import AccessControl from "./pages/access-control/AccessControl";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter basename="/ticket-application">
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
  );
}

export default App;
