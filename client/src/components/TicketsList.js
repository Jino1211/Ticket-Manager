import React from "react";
import Ticket from "./Ticket";

export default function TicketsList({
  allTickets,
  setCounterHiddenTickets,
  counterHiddenTickets,
}) {
  return (
    <>
      <div className="ticket-list">
        {allTickets?.map((ticket, i) => (
          <Ticket
            key={`ticket-${i}`}
            ticket={ticket}
            setCounterHiddenTickets={setCounterHiddenTickets}
            counterHiddenTickets={counterHiddenTickets}
          />
        ))}
      </div>
    </>
  );
}
