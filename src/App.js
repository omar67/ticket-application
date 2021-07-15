import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import React, { useEffect } from "react";
import Error404 from "./pages/404";
import { socket } from "./config/socketio";
import Ticket from "./pages/ticket";

function App() {
  const [ticket, setTicket] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    socket.on("update ticket", (msg) => {
      console.log("msg received", msg);
      setTicket(msg);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/ticket/:id">
              <Ticket ticket={ticket} isLoading={isLoading} />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
