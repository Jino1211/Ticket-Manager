const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  creationTime: {
    type: Date,
    default: new Date(),
  },
  labels: {
    type: Array,
  },
});

ticketsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Tickets", ticketsSchema);
