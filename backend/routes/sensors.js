const router = require('express').Router();
let Sensor = require('../models/sensor.model');

router.route('/').get((req, res) => {
  Sensor.find()
    .then(sensors => res.json(sensors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const centerPoint = String(req.body.centerPoint);
  const radius = Number(req.body.radius);
  const sensorCount = Number(req.body.sensorCount);

  const newSensor = new Sensor({
    centerPoint,
    radius,
    sensorCount,
  });

  newSensor.save()
  .then(() => res.json('Sensor added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Sensor.findById(req.params.id)
    .then(sensor => res.json(sensor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Sensor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sensor deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Sensor.findById(req.params.id)
    .then(sensor => {
      sensor.centerPoint = String(req.body.centerPoint);
      sensor.radius = Number(req.body.radius);
      sensor.sensorCount = Number(req.body.sensorCount);

      sensor.save()
        .then(() => res.json('Sensor updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;