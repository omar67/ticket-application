import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { socket } from "../config/socketio";
import Invalid from "./invalid";
import Valid from "./valid";

export default function Ticket(props) {
  const [ticket, setTicket] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    var token = window.localStorage.getItem("token");
    console.log("token: ", token);
    if (token === null) {
      console.log("redirected to login from ticket");
      history.push("/login");
    }
    if (id !== undefined) {
      window.localStorage.setItem("ticket", id);
      socket.emit("join", { ticket: id, token });
    }

    socket.on("update ticket", (msg) => {
      console.log("msg received", msg);
      socket.emit("request", { ticket: id, token });
    });
    socket.on("ticket", (ticket) => {
      console.log("ticket received", ticket);
      if (ticket.error && ticket.error === "Unauthorized Access!") {
        // clear local storage
        localStorage.removeItem("token");
        history.push("/login");
      }
      setTicket(ticket);
      setIsLoading(false);
    });
  }, [id, history]);

  if (isLoading) return <h1>Loading Ticket...</h1>;
  else
    return id === undefined || ticket.error !== undefined ? (
      <Invalid ticket={ticket} />
    ) : (
      <Valid ticket={ticket} />
    );
}
