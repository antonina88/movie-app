const { Schema } = require("mongoose");

const user = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true,
    default: 'user'
  }
});

module.exports = user;