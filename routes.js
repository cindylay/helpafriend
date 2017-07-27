var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var validator = require('express-validator');

// models
var Job = require('./models').Job;

//our first test route right here:
router.get('/', function(req, res) {
  res.json({ message: 'Hooray! Welcome to our api!!'});
});

// GET: get all jobs
router.get('/api/jobs', function(req, res) {
  Job.find({}, function(array, err){
    if(err){
      console.log("Could not find jobs!")
      res.send({
        success: false,
        error: err
      })
    } else if(array.length === 0){
      console.log("array.length === 0!")
      res.send({
        success: false,
        message: "No jobs in array"
      })
    } else {
      console.log('jobs have been found!');
      res.send({
        success: true,
        message: array
      })
    }
  })
});

// GET: get a single job, view the job in detail
router.get('/api/jobs/:jobId', function(req, res) {
  var mealId = req.params.mealId;
  Job.findOne({_id:mealId},function(array, err){
    if(err){
      console.log("Could not find single job")
      res.send({
        success: false,
        error: err
      })
    } else if(array.length === 0){
      console.log("array.length === 0!")
      res.send({
        success: false,
        message: "No job has been found"
      })
    } else {
      console.log('Single job has been found!');
      res.send({
        success: true,
        message: array
      })
    }
  })
});

// POST: click the apply button and apply for a job


module.exports = router;
