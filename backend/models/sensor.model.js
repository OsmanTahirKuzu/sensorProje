const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sensorSchema = new Schema({
  centerPoint: { type: String, required: true },
  radius: { type: Number, required: true },
  sensorCount: { type: Number, required: true },
}, {
  timestamps: true,
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;