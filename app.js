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
    res.status(400).send("Server Problem");
  }
});

app.patch("/api/tickets/:ticketsId/done", (req, res) => {
  const { ticketsId } = req.params;
  const updateTicket = {
    done: true,
  };
  Tickets.updateOne({ ticketsId }, updateTicket, { new: true })
    .then(() => {
      res.status(201).send({ updated: true });
    })
    .cath((e) => {
      res.status(404).send({ updated: true });
    });
});

app.patch("/api/tickets/:ticketsId/undone", (req, res) => {
  const { ticketsId } = req.params;
  const updateTicket = {
    done: false,
  };
  Tickets.updateOne({ ticketsId }, updateTicket, { new: true })
    .then(() => {
      res.status(201).send({ updated: true });
    })
    .cath((e) => {
      res.status(404).send({ updated: true });
    });
});

module.exports = app;
