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
    " View Count",
  ];

  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((data) => {
        setAllTickets(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="main">
      <input className="search-field" placeholder="Search your tickets"></input>
      <div className="labels-menu">
        {labels.map((label, i) => (
          <span className="label-menu" key={`label-${i}`}>
            {label}{" "}
          </span>
        ))}
      </div>
      <TicketsList allTickets={allTickets} />
    </div>
  );
}
