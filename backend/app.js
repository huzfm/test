const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan')
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')
const cors = require('cors')
const cookies = require('cookie-parser');
const cookieParser = require('cookie-parser');

// Initialize the app
const app = express();

dotenv.config();


app.use(express.json()); // middleware which handles json data
app.use(morgan('dev')) // middlwware which logs HTTP request 
app.use(
      cors({
            origin: 'http://localhost:3000',// Specify your frontend's URL here
            credentials: true, // Allow sending cookies 
      })
)
app.use(cookieParser())

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
// Simple home route for testing the server
app.get('/', (req, res) => {
      res.status(200).json({ message: 'Welcome to the API!' });
});

module.exports = app;  