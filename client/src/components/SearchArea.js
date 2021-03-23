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

  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((data) => {
        setAllTickets(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const getBySearch = (e) => {
    const inputValue = e.target.value;
    axios.get(`/api/tickets?searchText=${inputValue}`).then((res) => {
      console.log(res.data);
      if (res.data) {
        setAllTickets(res.data);
      } else {
        setAllTickets("Not Found");
      }
    });
  };

  return (
    <div className="main">
      <input
        className="search-input"
        id="searchInput"
        placeholder="Search your tickets"
        onChange={getBySearch}
      ></input>
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
