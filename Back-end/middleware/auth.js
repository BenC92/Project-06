const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //const token = req.headers.authorization.split(' ')[1];
    let token = req.headers.authorization
    if (!token) {
      return res.status(401).send('Access denied / Unauthorized request')
    }
    token = token.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
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