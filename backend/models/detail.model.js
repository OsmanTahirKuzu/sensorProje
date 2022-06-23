const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailSchema = new Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  reportDelay: { type: Number, required: true },
  
}, {
  timestamps: true,
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;