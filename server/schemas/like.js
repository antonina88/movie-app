const { Schema } = require("mongoose");

const like = new Schema({
  count: { type: Number, default: 0 },
  username: { type: String, required: true },
  movieId: { type: String, required: true }
});

module.exports = like;