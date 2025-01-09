const express = require('express')
const jobController = require('./../controller/jobController')
const authController = require('./../controller/authController')
const router = express.Router()


router.post('/create', jobController.createjob)
router
      .route('/')
      .get(authController.protect, jobController.getAllJobs)

router
      .route('/:id')
      .get(jobController.getJob)
      .patch(jobController.updateJob)
      .delete(jobController.deleteJob)

module.exports = router