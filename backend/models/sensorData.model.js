const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sensorDataSchema = new Schema({
   type:{type:String,required: true},
   location:{type:String,required: true},
   reportDelay: {type: Number,required: true},
   duman: { type: Number, required: true },
   co2: { type: Number, required: true },
   metan: { type: Number, required: true },
   o2:{ type: Number, required: true },
   toz:{ type: Number, required: true },
   timeStamps:{ type: String, required: true },
}, {
  timestamps: true,
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;