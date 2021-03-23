import React from "react";
import Label from "./Label";
import { useState } from "react";
import "../styles/Ticket.css";

export default function Ticket({
  ticket,
  setCounterHiddenTickets,
  counterHiddenTickets,
}) {
  const [hideTicket, setHideTicket] = useState("ticket");

  const hide = (e) => {
    setHideTicket("ticket-hidden");
    setCounterHiddenTickets(
      counterHiddenTickets ? counterHiddenTickets + 1 : 1
    );
  };
  return (
    <div className={hideTicket}>
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
      <button className="hideTicketButton" onClick={hide}>
        Hidden
      </button>
      <hr />
    </div>
  );
}
