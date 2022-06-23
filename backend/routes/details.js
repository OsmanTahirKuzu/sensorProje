const router = require('express').Router();
let Detail = require('../models/detail.model');

router.route('/').get((req, res) => {
  Detail.find()
    .then(details => res.json(details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const location = req.body.location;
  const reportDelay = req.body.reportDelay;
  

  const newDetail = new Detail({
    type,
    location,
    reportDelay,
  });

  newDetail.save()
  .then(() => res.json('Detail added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Detail.findById(req.params.id)
    .then(details => res.json(details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Detail.findByIdAndDelete(req.params.id)
    .then(() => res.json('Detail deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Detail.findById(req.params.id)
    .then(details => {
      details.type = req.body.type;
      details.location = req.body.location;
      details.reportDelay = req.body.reportDelay;
      

      details.save()
        .then(() => res.json('Detail updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;