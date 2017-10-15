const { Schema } = require("mongoose");

const comment = new Schema({
  description: {
    type: String,
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie"
  },
  userId: {
    type: String,
    required: true
  },
  date: { type: Date }
});

module.exports = comment;
