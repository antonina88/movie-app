const { Schema } = require("mongoose");

const comment = new Schema({
  description: {
    type: String,
    required: true
  },
  movieId: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Date },
});

module.exports = comment;