const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const cookie = require('cookie');
const { token } = require('morgan');


//creating of jwt 
const signToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
      });
};


// adding user to databse
exports.signup = async (req, res) => {
      try {
            const user = await User.create(req.body);
            res.status(200).json(user)
      } catch (err) {
            res.status(401).json({ message: 'Error in signup', error: err.message });
      }
};


exports.login = async (req, res) => {
      try {
            // Find user by email
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                  return res.status(404).json({ message: 'Invalid email' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                  return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate token
            const token = signToken(user._id);
            const cookieOptions = {
                  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000),
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'none',
                  path: '/'
            };

            res.cookie('jwt', token, cookieOptions);

            // Send success response with token and user details
            return res.status(200).json({
                  message: 'Login successful',
                  user,
                  token,  // Send the token directly in the response body
            });

      } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error', error: err.message });
      }
};

// handling logout function which also removes the jwt from cookie
exports.logout = (req, res) => {
      try {
            res.cookie('jwt', '', {
                  expires: new Date(0), // Expire the cookie immediately
                  httpOnly: true, // Ensures the cookie is not accessible via JavaScript
                  secure: process.env.NODE_ENV === 'production', // Only true in production over HTTPS
                  sameSite: 'none', // Helps mitigate CSRF attacks
            });

            return res.status(200).json({
                  message: 'Logged out successfully',
                  token
            });
      } catch (err) {
            console.error('Logout error:', err);
            return res.status(500).json({
                  status: 'fail',
                  message: 'Error during logout',
            });
      }
};




// // Middleware to protect routes

// exports.protect = async (req, res, next) => {
//       try {
//             // Get the token from the Authorization header
//             const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from 'Bearer <token>'

//             if (!token) {
//                   return res.status(401).json({ message: 'No token provided. Authorization denied.' });
//             }

//             // Verify the token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // JWT_SECRET_KEY should be your secret key

//             // Attach the user ID to the request object (you can add other user details if necessary)
//             req.user = decoded;

//             next(); // Call the next middleware or route handler
//       } catch (err) {
//             console.error(err);
//             return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
//       }
// };




exports.protect = async (req, res, next) => {
      try {
            // Get the token from the Authorization header or the cookies
            let token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from 'Bearer <token>'

            if (!token) {
                  token = req.cookies.token; // Look for token in cookies
            }

            if (!token) {
                  return res.status(401).json({ message: 'No token provided. Authorization denied.' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // JWT_SECRET_KEY should be your secret key

            // Attach the user ID to the request object (you can add other user details if necessary)
            req.user = decoded;

            next(); // Call the next middleware or route handler
      } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
      }
};
