import React from "react";

export default function Invalid(props) {
  return (
    <h1>
      {props.props.ticket.error ? props.props.ticket.error : "Invalid Ticket"}
    </h1>
  );
}
