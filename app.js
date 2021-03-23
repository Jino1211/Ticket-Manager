const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tickets = require("./models/tickets");

app.use(express.static("client/build"));
app.use(express.json());

app.get("/api/tickets", async (req, res) => {
  try {
    const { searchText } = req.query;
    let data = await Tickets.find({});
    searchText
      ? (data = data.filter((ticket) =>
          ticket.title.toLowerCase().includes(searchText.toLowerCase())
        ))
      : data;
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Problem");
  }
});

app.patch("/api/tickets/:ticketsId/done", (req, res) => {
  const { ticketsId } = req.params;

  Tickets.updateOne({ _id: ticketsId }, { done: true }, { new: true })
    .then((data) => {
      console.log(data);
      res.status(200).send({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).send({ message: "ID not found", updated: false });
      } else {
        res.status(500).send({ Error: "Mongoose error", updated: false });
      }
    });
});

app.patch("/api/tickets/:ticketsId/undone", (req, res) => {
  const { ticketsId } = req.params;

  Tickets.updateOne({ _id: ticketsId }, { done: false }, { new: true })
    .then(() => {
      res.status(200).send({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).send({ message: "ID not found", updated: false });
      } else {
        res.status(500).send({ Error: "Mongoose error", updated: false });
      }
    });
});

module.exports = app;
