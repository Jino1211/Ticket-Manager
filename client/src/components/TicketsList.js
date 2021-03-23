import React from "react";
import Ticket from "./Ticket";

export default function TicketsList(allTickets) {
  console.log(allTickets);
  return (
    <div className="ticket-list">
      {/* {allTickets.map((ticket) => {
        <Ticket ticket={ticket} />;
      })} */}
    </div>
  );
}
