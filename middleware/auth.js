require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
      //on recupere le token
    const token = req.headers.authorization.split(' ')[1];
    //on compare le token
    const decodedToken = jwt.verify(token, process.env.AUTH_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};