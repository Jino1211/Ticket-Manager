import React from "react";
import TicketsList from "./TicketsList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchArea() {
  const labels = [
    "Help",
    "Tech",
    "Guidelines",
    "Corvid",
    "Api",
    "Collapse",
    "Expand",
    "Problem",
    "Login",
    "Tutorial",
    "View Count",
  ];

  const [allTickets, setAllTickets] = useState([]);
  const [counterHiddenTickets, setCounterHiddenTickets] = useState();

  //GET all ticket when the page is loading first
  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((tickets) => {
        tickets.data.forEach((ticket) => (ticket.hidden = false));
        setAllTickets(tickets.data);
      })
      .catch((e) => console.log(e));
  }, []);

  //Get the all ticket that match to the input search
  const getTicketBySearch = (e) => {
    const inputValue = e.target.value;
    axios
      .get(`/api/tickets?searchText=${inputValue}`)
      .then((res) => {
        setAllTickets(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Restore all the hidden ticket
  const restoreAll = () => {
    allTickets.forEach((ticket) => (ticket.hide = false));
    setCounterHiddenTickets();
    setAllTickets(allTickets);
  };

  return (
    <div className="main">
      {counterHiddenTickets && (
        <button id="restoreHideTickets" onClick={restoreAll}>
          restoreAll
        </button>
      )}
      <input
        className="search-input"
        id="searchInput"
        placeholder="Search your tickets"
        onChange={getTicketBySearch}
      ></input>
      <div id="hideTicketsCounter">{counterHiddenTickets}</div>
      <div className="labels-menu">
        {labels.map((label, i) => (
          <span className="label-menu" key={`label-${i}`}>
            {label}{" "}
          </span>
        ))}
      </div>
      <TicketsList
        allTickets={allTickets}
        setCounterHiddenTickets={setCounterHiddenTickets}
        counterHiddenTickets={counterHiddenTickets}
        setAllTickets={setAllTickets}
      />
    </div>
  );
}
