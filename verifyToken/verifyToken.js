// importing jsonwebtoken library for token verification
import jwt from 'jsonwebtoken';

// function to vverify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // if no function is provided, return a 403 Forbidden respons
  if (!token) return res.status(403).send({ message: 'No token provided.' });

  // verify token using secret key stored in environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });

    req.user = decoded;
    next();
  });
};

// export the verifytoken for use in other parts of the app
export default verifyToken;