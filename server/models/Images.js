const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = Schema({
  cid: Number,
  front: String,
  side: String,
  back: String
})

mongoose.model('images', imageSchema);