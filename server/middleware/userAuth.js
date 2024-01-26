const jwt = require('jsonwebtoken');
require('dotenv').config();
const userAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
        "statusCode":401,
         message: 'Unauthorized - User token missing' 
        });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use your actual secret key here

    if (decoded) {
      req.locals = decoded; // Set the locals in the request for further use if needed
      next();
    } else {
      res.status(403).json({
        "statusCode":403,
         message: 'Forbidden - User access required'
         });
    }
  } catch (error) {
    res.status(401).json({ 
        "statusCode":401,
        message: 'Unauthorized - Invalid User token' 
    });
  }
};

module.exports = userAuth;
