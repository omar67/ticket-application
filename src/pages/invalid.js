import React from "react";

export default function Invalid(props) {
  return <h1>{props.ticket.error ? props.ticket.error : "Invalid Ticket"}</h1>;
}
