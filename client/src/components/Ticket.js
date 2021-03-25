import React from "react";
import Label from "./Label";
import "../styles/Ticket.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Ticket({
  ticket,
  setCounterHiddenTickets,
  counterHiddenTickets,
  setHideTickets,
  hideTickets,
  ticketCondition,
}) {
  useEffect(() => {
    if (ticketCondition) setInitCondition(true);
  }, []);
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

  const [condition, setCondition] = useState("");
  const [conditionClass, setConditionClass] = useState("");
  const [initCondition, setInitCondition] = useState();

  //Done or unDone function
  const doneUndone = async (e) => {
    setInitCondition();
    if (e.target.checked) {
      try {
        axios.patch(`/api/tickets/${ticket._id}/done`);
        setCondition("Saved!");
        setConditionClass("condition");
      } catch (e) {
        setCondition("FAILED!");
        setConditionClass("condition");
        e.target.checked = false;
      }
      setTimeout(() => {
        setCondition("");
        setConditionClass("");
      }, 4000);
    } else {
      try {
        axios.patch(`/api/tickets/${ticket._id}/undone`);
        setCondition("Saved!");
        setConditionClass("condition");
      } catch (e) {
        setCondition("FAILED!");
        setConditionClass("condition");
        e.target.checked = false;
      }
      setTimeout(() => {
        setCondition("");
        setConditionClass("");
      }, 4000);
    }
  };

  return (
    <div className={ticket.hide ? "ticket-hidden" : "ticket"}>
      <label className="switch">
        <input
          className="check-box"
          type="checkbox"
          onChange={doneUndone}
          checked={initCondition}
        ></input>
        <span className="slider"></span>
        <span className={conditionClass}>{condition}</span>
      </label>
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
