import { Router } from 'express';
import { storage } from '../services/storage';
import { generateToken } from '../middleware/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const router = Router();

// Login validation schema
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Register validation schema
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  role: z.enum(['admin', 'user']).default('user'),
  avatar: z.string().optional(),
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        message: 'Invalid login data', 
        errors: result.error.format() 
      });
    }
    
    const { username, password } = result.data;
    
    // Find user by username
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // For demo purposes, if password is stored in plain text
    // In production, you should use bcrypt.compare
    let passwordMatch = false;
    
    if (process.env.NODE_ENV === 'production') {
      // Compare hashed password
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      // For development, allow direct comparison (if passwords aren't hashed)
      passwordMatch = password === user.password;
    }
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Generate JWT token
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role
    });
    
    // Return user info and token
    res.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        message: 'Invalid registration data', 
        errors: result.error.format() 
      });
    }
    
    const userData = result.data;
    
    // Check if username already exists
    const existingUser = await storage.getUserByUsername(userData.username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    
    // Hash password for production
    if (process.env.NODE_ENV === 'production') {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    
    // Create new user
    const newUser = await storage.createUser(userData);
    
    // Generate JWT token
    const token = generateToken({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    });
    
    // Return user info and token
    res.status(201).json({
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Get current user info
router.get('/me', async (req, res) => {
  // This route will be protected by the authenticateToken middleware
  // The user will be attached to the request object
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const user = await storage.getUserByUsername(req.user.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user information' });
  }
});

export default router;
