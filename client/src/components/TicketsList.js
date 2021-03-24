import React from "react";
import Ticket from "./Ticket";

export default function TicketsList({
  allTickets,
  setCounterHiddenTickets,
  counterHiddenTickets,
  setHideTickets,
  hideTickets,
  // setAllTickets,
  // setOriginalTickets,
  // originalTickets,
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
            setHideTickets={setHideTickets}
            hideTickets={hideTickets}
            // setAllTickets={setAllTickets}
            // setOriginalTickets={setOriginalTickets}
            // allTickets={allTickets}
            // originalTickets={originalTickets}
          />
        ))}
      </div>
    </>
  );
}
