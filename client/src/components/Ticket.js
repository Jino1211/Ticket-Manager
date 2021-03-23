import React from "react";
import Label from "./Label";

export default function Ticket({ ticket }) {
  return (
    <div className="ticket">
      <div className="title">title: {ticket.title}</div>
      <div className="content">content: {ticket.content}</div>
      <div className="labels-div">
        {ticket.labels?.map((label, i) => (
          <Label key={`label-${i}`} label={label} />
        ))}
      </div>
      <div className="date">
        user Email: {ticket.userEmail} | creation Time:{" "}
        {new Date(ticket.creationTime).toLocaleString()}
      </div>
      <hr />
    </div>
  );
}
