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
  const [originalTickets, setOriginalTickets] = useState([]);
  const [filterLabel, setFilterLabel] = useState([]);

  //GET all ticket when the page is loading first
  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((tickets) => {
        tickets.data.forEach((ticket) => (ticket.hidden = false));
        setOriginalTickets(tickets.data);
        setAllTickets(tickets.data);
      })
      .catch((e) => console.log(e));
  }, []);

  //Get the all ticket that match to the input search. set persistent, ticket that is hidden doesn't display when you search
  const getTicketBySearch = async (e) => {
    const inputValue = e.target.value;
    try {
      const res = await axios.get(`/api/tickets?searchText=${inputValue}`);
      let tempTicket = [];
      res.data.forEach((newTicket) => {
        let bool = true;
        allTickets.forEach((oldTicket) => {
          if (oldTicket.content === newTicket.content && oldTicket.hide)
            bool = false;
        });
        if (bool) tempTicket.push(newTicket);
      });
      setAllTickets(tempTicket);
    } catch (e) {
      console.log(e);
    }
  };

  //Restore all the hidden ticket
  const restoreAll = () => {
    allTickets.forEach((ticket) => (ticket.hide = false));
    setCounterHiddenTickets();
    setAllTickets(allTickets);
  };

  //Click on specific label it's render the ticket that have that label
  const filteringByLabel = (e) => {
    const inputLabel = e.target.innerText;

    if (filterLabel.includes(inputLabel)) {
      setFilterLabel([]);
      setAllTickets(originalTickets);
    } else {
      const temp = originalTickets.filter((ticket) =>
        ticket.labels.includes(inputLabel)
      );
      const arr = filterLabel;
      arr.push(inputLabel);
      setFilterLabel(arr);
      setAllTickets(temp.slice());
    }
  };

  return (
    <div className="main">
      <input
        className="search-input"
        id="searchInput"
        placeholder="Search your tickets"
        onChange={getTicketBySearch}
      ></input>
      {counterHiddenTickets && (
        <div className="restore-div">
          <button id="restoreHideTickets" onClick={restoreAll}>
            restoreAll
          </button>
          <br />
          <span id="hideTicketsCounter">{counterHiddenTickets}</span>
          <span> Hidden tasks</span>
        </div>
      )}
      <div className="labels-menu">
        {labels.map((label, i) => (
          <span
            className="label-menu"
            key={`label-${i}`}
            onClick={filteringByLabel}
          >
            {label}
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
