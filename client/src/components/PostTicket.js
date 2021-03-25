import React from "react";

export default function PostTicket() {
  return (
    <form action="/api/tickets/new" method="post" target="hidden_iframe">
      <label className="title-form">
        Title
        <input className="title-input" name="title"></input>
      </label>
      <label className="content-form">
        Content
        <input className="content-input" name="content"></input>
      </label>
      <label className="userEmail-form">
        User Email
        <input
          className="userEmail-input"
          type="string"
          name="userEmail"
        ></input>
      </label>
      <label className="creationTime-form">
        Creation Time
        <input
          className="creationTime-input"
          type="date"
          name="creationTime"
        ></input>
      </label>
      <div>
        <label className="labels-form">
          Help
          <input
            type="checkbox"
            name="labels[]"
            value="help"
            className="help-label-form"
          ></input>
        </label>
        <label>
          Tech
          <input
            type="checkbox"
            name="labels[]"
            value="tech"
            className="tech-label-form"
          ></input>
        </label>
        <label>
          Guidelines
          <input
            type="checkbox"
            name="labels[]"
            value="guidelines"
            className="guidelines-label-form"
          ></input>
        </label>
        <label>
          Corvid
          <input
            type="checkbox"
            name="labels[]"
            value="corvid"
            className="corvid-label-form"
          ></input>
        </label>
        <label>
          Api
          <input
            type="checkbox"
            name="labels[]"
            value="api"
            className="api-label-form"
          ></input>
        </label>
        <label>
          Collapse
          <input
            type="checkbox"
            name="labels[]"
            value="collapse"
            className="collapse-label-form"
          ></input>
        </label>
        <label>
          Expand
          <input
            type="checkbox"
            name="labels[]"
            value="expand"
            className="expand-label-form"
          ></input>
        </label>
        <label>
          Problem
          <input
            type="checkbox"
            name="labels[]"
            value="problem"
            className="problem-label-form"
          ></input>
        </label>
        <label>
          Login
          <input
            type="checkbox"
            name="labels[]"
            value="login"
            className="login-label-form"
          ></input>
        </label>
        <label>
          Tutorial
          <input
            type="checkbox"
            name="labels[]"
            value="tutorial"
            className="tutorial-label-form"
          ></input>
        </label>
        <label>
          View Count
          <input
            type="checkbox"
            name="labels[]"
            value="view count"
            className="view-count-label-form"
          ></input>
        </label>
      </div>
      <button className="add-btn" type="submit">
        ADD
      </button>
    </form>
  );
}
