const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/handleErrors');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    console.log("No token provided");
    return res.status(401).send('Authentication Error: Please Login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("Failed to authenticate token:", ex.message);
    handleError(res, 401, 'Authentication Error: Unauthorize user');
  }
};

module.exports = auth;
