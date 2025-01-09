const Job = require('./../models/jobModel')

//post request to databse
exports.createjob = async (req, res) => {
      try {
            const test = await Job.create(req.body);  // Save the test to the database
            res.status(201).json(test);
      } catch (err) {
            res.status(400).json({
                  status: 'fail',
                  message: err.message,
            });
      }
};

// get request to data base
exports.getAllJobs = async (req, res) => {
      try {
            const test = await Job.find()
            res.status(201).json(test)
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// get request with specific id to database
exports.getJob = async (req, res) => {
      try {
            const test = await Job.findById(req.params.id)
            res.status(201).json(test)

      }
      catch (err) {
            res.status(404).json(err.message)
      }
}

// patch request to database
exports.updateJob = async (req, res) => {
      try {
            const test = await Job.findByIdAndUpdate(req.params.id, req.body, {
                  new: true
            })
            res.status(201).json(test)
      }
      catch (err) {
            res.status(404).json(err.message)
      }
}

// delete request to database
exports.deleteJob = async (req, res) => {
      try {
            const test = await Job.findByIdAndDelete(req.params.id);
            res.status(201).json('Test has been deleted')

      }
      catch (err) {
            res.status(404).json(err.message)
      }
}