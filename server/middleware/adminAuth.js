const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ 
        "statusCode":401,
        message: 'Unauthorized - Admin token missing'
     });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY); // Use your actual secret key here
    if (decoded) {
      req.locals = decoded; // Set the locals in the request for further use if needed
      next();
    } else {
      res.status(403).json({ 
        "statusCode":403,
        message: 'Forbidden - Admin access required'
     });
    }
  } catch (error) {
    res.status(401).json({
        "statusCode":401,
         message: 'Unauthorized - Invalid admin token' 
        });
  }
};

module.exports = adminAuth;
