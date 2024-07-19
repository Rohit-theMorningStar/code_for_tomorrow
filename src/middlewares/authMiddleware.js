const jwt = require('jsonwebtoken') ;
const prisma =require('../utils/db') ;

const secretKey = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (user && user.sessionToken === token) {
      req.user = user;
      next();
    } else {
      res.status(401).send('Invalid token.');
    }
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;  
