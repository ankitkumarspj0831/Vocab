const mongoose = require("mongoose");

// Defining word 
const wordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
  },
  phrases: {
    type: String,
  },
});

module.exports = mongoose.model("Word", wordSchema);
