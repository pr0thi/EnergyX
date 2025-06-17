import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '../services/userService';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication token is required' });
    }

    const user = await userService.getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Add user to request object for use in protected routes
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}; 