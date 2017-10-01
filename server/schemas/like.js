const { Schema } = require("mongoose");

const like = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie"
  }
});

module.exports = like;