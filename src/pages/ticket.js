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
    const token = window.localStorage.getItem("token");

    if (id !== undefined) {
      window.localStorage.setItem("ticket", id);
    }
    if (token === null) {
      console.log("redirected to login from ticket");
      history.push("/login");
      return;
    }
    if (token && id) socket.emit("join", { ticket: id, token });

    if (socket.disconnected) socket.connect();
    socket.on("update ticket", (msg) => {
      console.log("msg received");
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
    return () => {
      socket.emit("leave", id); // leave room
      socket.off("ticket");
      socket.off("update ticket");
      socket.disconnect();
    };
  }, [id, history]);

  if (isLoading) return <h1>Loading Ticket...</h1>;
  else
    return id === undefined || ticket.error !== undefined ? (
      <Invalid ticket={ticket} />
    ) : (
      <Valid ticket={ticket} />
    );
}
