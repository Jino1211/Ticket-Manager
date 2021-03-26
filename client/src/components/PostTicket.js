import axios from "axios";
import React from "react";
import "../styles/PostTicket.css";

export default function PostTicket({
  setDisplayForm,
  setBlur,
  setDeleted,
  deleted,
  setSaveTicket,
  setSaveTicketClass,
}) {
  const hideFormFromDom = () => {
    setDisplayForm();
    setBlur("blur");
  };
  const sendAndReset = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const sendData = {};
    for (let [key, value] of form) {
      if (key === "labels") {
        sendData[key] = sendData[key] ? sendData[key].concat(value) : [value];
      } else {
        sendData[key] = value;
      }
    }
    axios
      .post("/api/tickets/new", sendData)
      .then(() => {
        setDeleted(deleted.slice());
        hideFormFromDom();
        setSaveTicket("Ticket Save And Update!");
        setSaveTicketClass("saved-ticket");
        setTimeout(() => {
          setSaveTicket();
          setSaveTicketClass();
        }, 4000);
      })
      .catch((e) => {
        console.log(e);
        hideFormFromDom();
        setSaveTicket("Failed Save!");
        setSaveTicketClass("saved-ticket");
        setTimeout(() => {
          setSaveTicket();
          setSaveTicketClass();
        }, 4000);
      });
  };
  return (
    <form className="form" onSubmit={sendAndReset}>
      <span className="exit" onClick={hideFormFromDom}>
        ✖
      </span>
      <p className="p-form">NEW TICKET</p>
      <div className="firs-line-form">
        <label className="title-form" className="form-input">
          Ticket Title
          <input className="title-input" name="title" required></input>
        </label>
        <label className="userEmail-form" className="form-input">
          User Email
          <input
            className="userEmail-input"
            type="string"
            name="userEmail"
            required
          ></input>
        </label>
        <label className="creationTime-form" className="form-input">
          Creation Time <br />
          <input
            className="creationTime-input"
            type="date"
            name="creationTime"
            required
          ></input>
        </label>
      </div>
      <div className="labels-form">
        <label className="help-label-form">
          Help
          <input
            type="checkbox"
            name="labels"
            value="help"
            className="help-label-form"
          ></input>
        </label>
        <label>
          Tech
          <input
            type="checkbox"
            name="labels"
            value="tech"
            className="tech-label-form"
          ></input>
        </label>
        <label>
          Guidelines
          <input
            type="checkbox"
            name="labels"
            value="guidelines"
            className="guidelines-label-form"
          ></input>
        </label>
        <label>
          Corvid
          <input
            type="checkbox"
            name="labels"
            value="corvid"
            className="corvid-label-form"
          ></input>
        </label>
        <label>
          Api
          <input
            type="checkbox"
            name="labels"
            value="api"
            className="api-label-form"
          ></input>
        </label>
        <label>
          Collapse
          <input
            type="checkbox"
            name="labels"
            value="collapse"
            className="collapse-label-form"
          ></input>
        </label>
        <label>
          Expand
          <input
            type="checkbox"
            name="labels"
            value="expand"
            className="expand-label-form"
          ></input>
        </label>
        <label>
          Problem
          <input
            type="checkbox"
            name="labels"
            value="problem"
            className="problem-label-form"
          ></input>
        </label>
        <label>
          Login
          <input
            type="checkbox"
            name="labels"
            value="login"
            className="login-label-form"
          ></input>
        </label>
        <label>
          Tutorial
          <input
            type="checkbox"
            name="labels"
            value="tutorial"
            className="tutorial-label-form"
          ></input>
        </label>
        <label>
          View Count
          <input
            type="checkbox"
            name="labels"
            value="view count"
            className="view-count-label-form"
          ></input>
        </label>
      </div>
      <label id="content-form" className="form-input">
        Content
        <br />
        <input className="content-input" name="content" required></input>
      </label>
      <span onClick={() => setDeleted(deleted.slice())}>
        <button className="add-btn" type="submit">
          ADD
        </button>
      </span>
    </form>
  );
}
