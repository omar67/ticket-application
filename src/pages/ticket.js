import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../config/socketio";
import Invalid from "./invalid";
import Valid from "./valid";

export default function Ticket(props) {
  let { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      socket.emit("join", id);
    }
  }, [id]);

  if (props.isLoading) return <h1>Loading...</h1>;
  else
    return id === undefined || props.ticket.error !== undefined ? (
      <Invalid props={props} />
    ) : (
      <Valid props={props} />
    );
}
