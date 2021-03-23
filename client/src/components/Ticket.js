import React from "react";
import Label from "./Label";

export default function Ticket({ ticket, date }) {
  console.log(ticket);
  return (
    <div className="ticket">
      <div className="title">title: {ticket.title}</div>
      <div className="content">content: {ticket.content}</div>
      <div className="date">
        creation Time: {new Date(ticket.creationTime).toLocaleDateString()}
      </div>
      <div className="labels-div">
        {ticket.labels.map((label, i) => (
          <Label key={`label-${i}`} label={label} />
        ))}
      </div>
      <div>user Email: {ticket.userEmail}</div>
      <hr />
    </div>
  );
}
