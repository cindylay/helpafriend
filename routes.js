var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var validator = require('express-validator');
var moment = require('moment');

// models
var Job = require('./models').Job;
var User = require('./models').User;

//our first test route right here:
router.get('/api', function(req, res) {
  res.render('homePage');
});

//GET: get all jobs (for Web App)
router.get('/api/jobs/all', function(req, res) {
  Job.find({}, function(err, array){
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
      res.render('allJobs', {
        jobObj: array,
        helpers: {
          toDate: function(date){
            return moment(date).format('MM/DD/YYYY, h:mm a')
          }
        }
      })
    }
  })
});
// GET: get all jobs (for mobile app)
router.get('/mobile/api/jobs/all', function(req, res) {
  Job.find({}, function(err, array){
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
  var jobId = req.params.jobId;
  Job.findOne({_id:jobId},function(err, obj){
    if(err){
      console.log("Could not find single job")
      res.send({
        success: false,
        error: err
      })
    } else if(obj === {}){
      console.log("object is empty!")
      res.send({
        success: false,
        message: "No job has been found"
      })
    } else {
      console.log('Single job has been found!', obj);
      res.render('oneJobRegister', {
        jobObj: obj,
        helpers: {
          toDate: function(date){
            return moment(date).format('MM/DD/YYYY, h:mm a')
          }
        }
      })
    }
  })
});

// POST: click the apply button and apply for a job
router.post('/api/jobs/:jobId', function(req,res) {
  var jobId = req.params.jobId;
  var user = new User ({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    socialSecurityNumber: req.body.socialSecurity,
    password: req.body.password
  })
  user.save(function (err, user) {
    if (err){
      console.log('User Application not saved in Mongoose', err)
      res.send('Please fill out the form correctly!!')
    } else {
      console.log('User Application has been saved', user)
      res.redirect('/success')
    }
  })
  // if(!req.user){
  //   res.redirect('/api/jobs/:jobId/registerApply')
  // } else {
  //   res.redirect('/api/jobs/:jobId/loginApply')
  // }
});

router.get('/success', function(req, res) {
  res.render('congrats')
})

router.get('/api/hire', function(req, res) {
  res.render('employerRegister')
})

router.post('/api/hire', function(req, res) {
  if (!req.body.picture) {
    var job = new Job ({
      employerName: req.body.employerName,
      picture: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/20431583_1768027010155592_3415745026352560816_n.jpg?oh=5e340d8c9070eb9a87293328dd3b6483&oe=5A068502',
      title: req.body.title,
      description:req.body.description,
      location: req.body.location,
      when: req.body.when,
      totalPay: req.body.totalPay,
      timeAllotted: req.body.timeAllotted
    })
  } else {
    var job = new Job ({
      employerName: req.body.employerName,
      picture: req.body.picture,
      title: req.body.title,
      description:req.body.description,
      location: req.body.location,
      when: req.body.when,
      totalPay: req.body.totalPay,
      timeAllotted: req.body.timeAllotted
    })
  }

  job.save(function(err, job) {
    if (err) {
      console.log('error in saving job listed by Employer', err)
      res.send('Please fill out the details correctly!')
    } else {
      console.log('Job listed by Employer has been successfully saved', job)
      res.redirect('/employer/success')
    }
  })
})

router.get('/employer/success', function(req, res) {
  res.render('employerSuccess')
})
//
// router.get('/api/jobs/:jobId/registerApply', function(req,res) {
//   res.redirect()
// });
//
// router.post('/api/jobs/:jobId/registerApply', function(req,res) {
//   if(/*login successful*/){
//     res.redirect('/api/jobs/:jobId/congrats')
//   } else {
//     alert('Application unsucessful')
//   }
// });
//
// router.get('api/jobs/:jobId/loginApply', function(req,res) {
//
// });
//
// router.post('api/jobs/:jobId/loginApply', function(req,res) {
//   if(/*login successful*/){
//     res.redirect('/api/jobs/:jobId/congrats')
//   } else {
//     alert('Application unsucessful')
//   }
// });
//
// router.get('/api/jobs/:jobId/congrats', function (req,res) {
//   if()
// });

module.exports = router;
