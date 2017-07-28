var mongoose = require('mongoose');

var Job = mongoose.model('job', {
  employerName: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  totalPay: {
    type: Number,
    required: true
  },
  timeAllotted: {
    type: String,
    required: true
  },
})

var User = mongoose.model('user', {
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  socialSecurityNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = {
  Job: Job,
  User: User,
};
