import React from "react";
import "../styles/searchArea.css";
import TicketsList from "./TicketsList";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/spinner.css";
import PostTicket from "./PostTicket";
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
  const [hideTickets, setHideTickets] = useState([]);
  const [index, setIndex] = useState();
  const [pageIndex, setPageIndex] = useState();
  const [numOfTickets, setNumOfTickets] = useState();
  const [tempText, setTempText] = useState("");
  const [spinner, setSpinner] = useState("spinner");
  const [blur, setBlur] = useState("blur");
  const [notFoundMessage, setNotFoundMessage] = useState();

  //GET all ticket when the page is loading first
  useEffect(() => {
    setSpinner("display-spinner");
    setBlur("display-blur");
    axios
      .get("/api/tickets")
      .then((tickets) => {
        tickets.data.forEach((ticket) => (ticket.hidden = false));
        setOriginalTickets(tickets.data);
        setAllTickets(tickets.data);
        setSpinner("spinner");
        setBlur("blur");
      })
      .catch((e) => {
        console.log(e);
        setSpinner("spinner");
        setBlur("blur");
      });
  }, []);

  //Reacting to page, show the number of the activate tickets
  useEffect(() => {
    setNumOfTickets(
      counterHiddenTickets && filterLabel.length === 0
        ? allTickets.length - counterHiddenTickets
        : counterHiddenTickets && filterLabel.length !== 0
        ? allTickets.length
        : allTickets.length
    );
  }, [allTickets, counterHiddenTickets]);

  //Response to display on DOM "Not Found" message when no tickets that match to search
  useEffect(() => {
    allTickets.length === 0
      ? setNotFoundMessage("Not Found")
      : setNotFoundMessage();
  });

  //Limited the number of tickets that display on DOM
  const limitView = (e) => {
    if (e.target.value === "All") return setAllTickets(originalTickets);
    const viewNumber = e.target.value;
    const limitTickets = [];
    if (index >= originalTickets.length) return;
    for (let i = viewNumber; i < viewNumber * 2; i++) {
      limitTickets.push(originalTickets[i]);
    }

    setIndex(viewNumber);
    setPageIndex(viewNumber * 2);
    setAllTickets(limitTickets);
  };

  //Display the next ticket
  const nextPage = () => {
    let bool = false;
    const limitTickets = [];
    for (let i = pageIndex; i < Number(pageIndex) + Number(index); i++) {
      if (i >= originalTickets.length - 1) {
        setAllTickets(limitTickets);
        bool = true;
        break;
      }
      limitTickets.push(originalTickets[i]);
    }
    bool ? setPageIndex(0) : setPageIndex(Number(pageIndex) + Number(index));
    setAllTickets(limitTickets);
  };

  //Get the all ticket that match to the input search. set persistent, ticket that is hidden doesn't display when you search
  const getTicketBySearch = async (e) => {
    const inputValue = e.target.value;
    setTempText(inputValue);
    try {
      setSpinner("display-spinner");
      setBlur("display-blur");
      const res = await axios.get(`/api/tickets?searchText=${inputValue}`);
      let tempTicket = [];
      res.data.forEach((newTicket) => {
        let bool = true;
        hideTickets.forEach((hideTicket) => {
          if (hideTicket.content === newTicket.content) bool = false;
        });
        if (bool) tempTicket.push(newTicket);
      });
      setAllTickets(tempTicket);
      setSpinner("spinner");
      setBlur("blur");
    } catch (e) {
      console.log(e);
      setSpinner("spinner");
      setBlur("blur");
    }
  };

  //Restore all the hidden ticket
  const restoreAll = () => {
    const ticketsToDisplay = originalTickets.filter((ticket) => {
      ticket.hide = false;
      return ticket.title.toLowerCase().includes(tempText.toLowerCase());
    });
    setCounterHiddenTickets();
    setAllTickets(ticketsToDisplay);
    setHideTickets([]);
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
      <label className="view-span"></label>
      <select onChange={limitView} className="limited-tickets">
        <option value="" selected disabled hidden>
          How Many Tickets
        </option>
        <option>All</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
      <button onClick={nextPage} className="next-btn">
        next
      </button>
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
      <div className={spinner}>
        {" "}
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
      <div className={blur}>
        <p className="counter">
          {numOfTickets > 1
            ? `${numOfTickets} Tickets display`
            : `${numOfTickets} Ticket display`}
        </p>
        {counterHiddenTickets && (
          <div className="hidden-details">
            <span id="hideTicketsCounter">{counterHiddenTickets}</span>
            <span className="hidden-tasks">
              {" "}
              Hidden {counterHiddenTickets > 1 ? `Tasks` : `Task`}
            </span>
            <button id="restoreHideTickets" onClick={restoreAll}>
              Restore All
              <div className="tool-tip-text">
                {hideTickets.map((hideTicket, i) => (
                  <span key={`hideTicket-${i}`} className="title-tip-text">
                    * {hideTicket.title}
                    <hr />
                  </span>
                ))}
              </div>
            </button>
          </div>
        )}
      </div>
      <div className={blur}>
        <p className="notFoundMessage">{notFoundMessage}</p>
        <PostTicket />
        <TicketsList
          allTickets={allTickets}
          setCounterHiddenTickets={setCounterHiddenTickets}
          counterHiddenTickets={counterHiddenTickets}
          setHideTickets={setHideTickets}
          hideTickets={hideTickets}
        />
      </div>
    </div>
  );
}
