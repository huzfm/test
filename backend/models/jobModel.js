const mongoose = require('mongoose')

// Schema in Dataase
const jobSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, 'User must have a name'],
      },

      Job: {

            type: String,
            required: [true, 'Please provide a Job'],
      },
      location: {
            type: String,
            required: [true, 'User must have a location'],
      }
});
// post middleware
jobSchema.post('save', function () {
      console.log("Post Document Middle")
})

// pre middleware
jobSchema.pre('save', function (next) {
      console.log("Pre Document Middle")
      next()
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job