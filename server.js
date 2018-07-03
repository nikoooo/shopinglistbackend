const express = require('express');
const bodyParser = require('body-parser');

// App
const app = express();
const port = process.env.PORT || 8000; // set our port

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // connect to our database
var Bear = require('./app/models/bear'); // Bear model

// Router
var router = express.Router()
router.use(function (req, res, next) { // middleware to use for all requests
  console.log('Something is happening.');
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function (req, res) {

    var bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function (err) {
      if (err)
        res.send(err);

      res.json({ message: 'Bear created!' });
    });

  })
  .get(function (req, res) {
    Bear.find(function (err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});