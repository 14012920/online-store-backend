const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    title: {type:String},
    image:{type:String},
  }
);

module.exports = mongoose.model('Hero', heroSchema);
