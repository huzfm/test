const User = require('../models/userModel');
// POST
exports.getAllUsers = async (req, res) => {
      try {
            const user = await User.find().populate('jobs')
            res.status(201).json(user)
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// POST with ID
exports.getUser = async (req, res) => {
      try {
            const user = await User.findById(req.params.id).populate('jobs')
            res.status(201).json(user)
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// PATCH 
exports.updateUser = async (req, res) => {
      try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
                  runValidators: true
            })
            res.status(201).json({ user })
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// delete
exports.deleteUser = async (req, res) => {
      try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(201).json("user has been deleted")
      } catch (err) {
            res.status(404).json(err.message)
      }
}
