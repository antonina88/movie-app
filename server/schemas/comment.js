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
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: { type: Date }
});

module.exports = comment;
