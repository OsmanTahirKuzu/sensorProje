const router = require('express').Router();
let SensorData = require('../models/sensorData.model');

router.route('/').get((req, res) => {
  SensorData.find()
    .then(sensorDatas => res.json(sensorDatas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type=String(req.body.type);
  const location =String(req.body.location);
  const reportDelay =Number(req.body.reportDelay);
  const duman=Number(req.body.duman);
  const co2=Number(req.body.co2);
  const metan=Number(req.body.metan);
  const o2=Number(req.body.o2);
  const toz=Number(req.body.toz);
  const timeStamps=String(req.body.timeStamps);

  const newSensorData = new SensorData({
    type,
    location,
    reportDelay,
    duman,
    co2,
    metan,
    o2,
    toz,
    timeStamps,
  });

  newSensorData.save()
  .then(() => res.json('SensorData added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  SensorData.findById(req.params.id)
    .then(sensorData => res.json(sensorData))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  SensorData.findByIdAndDelete(req.params.id)
    .then(() => res.json('SensorData deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  SensorData.findById(req.params.id)
    .then(sensorData => {
      sensorData.type=String(req.body.type);
      sensorData.location=String(req.body.location);
      sensorData.reportDelay=Number(req.body.reportDelay);
      sensorData.duman= Number(req.body.duman);
      sensorData.co2= Number(req.body.co2);
      sensorData.metan= Number(req.body.metan);
      sensorData.o2= Number(req.body.o2);
      sensorData.toz= Number(req.body.toz);
      sensorData.timeStamps= String(req.body.timeStamps);
      sensorData.save()
        .then(() => res.json('SensorData updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;