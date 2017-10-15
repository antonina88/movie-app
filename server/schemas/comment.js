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
<<<<<<< HEAD
  userId: {
    type: String,
    required: true
=======
 username: {
    type: String,
    ref: "User"
>>>>>>> 778ff315979baf4e504cde9aa9be4642e262fb1b
  },
  date: { type: Date }
});

module.exports = comment;
