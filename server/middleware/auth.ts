import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { storage } from '../services/storage';

// Define interface for JWT payload
interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

// Define interface to extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        role: string;
      };
    }
  }
}

// Get JWT secret from environment variables or use a default (for development only)
const JWT_SECRET = process.env.JWT_SECRET || 'your_development_jwt_secret';

// Middleware to authenticate JWT token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify the token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      
      const payload = decoded as JwtPayload;
      
      // Check if user exists in database
      const user = await storage.getUserByUsername(payload.username);
      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }
      
      // Attach user to request object
      req.user = {
        id: user.id,
        username: user.username,
        role: user.role
      };
      
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if user has admin role
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
  
  next();
};

// Generate JWT token
export const generateToken = (user: { id: number; username: string; role: string }): string => {
  const payload: JwtPayload = {
    userId: user.id,
    username: user.username,
    role: user.role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};
