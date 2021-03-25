import React from "react";
import Label from "./Label";
import "../styles/Ticket.css";

export default function Ticket({
  ticket,
  setCounterHiddenTickets,
  counterHiddenTickets,
  setHideTickets,
  hideTickets,
}) {
  //Responsible to hide the ticket when click on the "hide" button
  const hide = (e) => {
    ticket.hide = true;
    setCounterHiddenTickets(
      counterHiddenTickets ? counterHiddenTickets + 1 : 1
    );
    const temp = hideTickets;
    temp.push(ticket);
    setHideTickets(temp);
  };

  return (
    <div className={ticket.hide ? "ticket-hidden" : "ticket"}>
      <div className="title"> {ticket.title}</div>
      <button className="hideTicketButton" onClick={hide}>
        Hide
      </button>
      <div className="content"> {ticket.content}</div>
      <div className="labels-div">
        {ticket.labels?.map((label, i) => (
          <Label key={`label-${i}`} label={label} />
        ))}
      </div>
      <div className="date">
        <span className="user-email">
          {" "}
          <a href="#">{ticket.userEmail}</a>{" "}
        </span>
        |{" "}
        <span className="span-date">
          {new Date(ticket.creationTime).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
