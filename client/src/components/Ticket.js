import React from "react";
import Label from "./Label";
import "../styles/Ticket.css";

export default function Ticket({
  ticket,
  setCounterHiddenTickets,
  counterHiddenTickets,
}) {
  //Responsible to hide the ticket when click on the "hide" button
  const hide = (e) => {
    ticket.hide = true;
    setCounterHiddenTickets(
      counterHiddenTickets ? counterHiddenTickets + 1 : 1
    );
  };
  return (
    <div className={ticket.hide ? "ticket-hidden" : "ticket"}>
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
