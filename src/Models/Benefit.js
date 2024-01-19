const mongoose = require('mongoose');

// Subschema for Eligibility Criteria
const eligibilitySchema = new mongoose.Schema({
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time'],
    required: true,
  },
  waitingPeriod: {
    type: Number,
    required: true,
  },
  
});

const benefitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  eligibilityCriteria: {
    type: eligibilitySchema,
    required: true,
  },
});

const Benefit = mongoose.model('Benefit', benefitSchema);

module.exports = Benefit;
