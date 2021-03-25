const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tickets = require("./models/tickets");

app.use(express.static("client/build"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//GET all ticket. and also filter the data if receive query.
app.get("/api/tickets", async (req, res) => {
  try {
    const { searchText } = req.query;
    let data = await Tickets.find({});
    searchText
      ? (data = data.filter((ticket) =>
          ticket.title.toLowerCase().includes(searchText.toLowerCase())
        ))
      : data;
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Server Problem" });
  }
});

//PATCH, update the ticket to done.
app.patch("/api/tickets/:ticketsId/done", (req, res) => {
  const { ticketsId } = req.params;

  Tickets.updateOne({ _id: ticketsId }, { done: true }, { new: true })
    .then((data) => {
      res.status(200).json({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).json({ message: "ID not found", updated: false });
      } else {
        res.status(500).json({ Error: "Mongoose error", updated: false });
      }
    });
});

//PATCH, update the ticket to undone.
app.patch("/api/tickets/:ticketsId/undone", (req, res) => {
  const { ticketsId } = req.params;

  Tickets.updateOne({ _id: ticketsId }, { done: false }, { new: true })
    .then(() => {
      res.status(200).json({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).json({ message: "ID not found", updated: false });
      } else {
        res.status(500).json({ Error: "Mongoose error", updated: false });
      }
    });
});

app.post("/api/tickets/new", async (req, res) => {
  const { title, content, userEmail, done, creationTime, labels } = req.body;
  console.log(req.body);
  try {
    const newTicket = new Tickets({
      title,
      content,
      userEmail,
      done,
      creationTime,
      labels,
    });

    const doc = await newTicket.save();
    return res.status(200).json(newTicket);
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "HAHHA" });
  }
  res.send();
});

module.exports = app;
