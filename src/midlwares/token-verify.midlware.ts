import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'vmd21$wkm5ldm'); 

    req.body.id = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;