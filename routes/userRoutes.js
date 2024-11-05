import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import Ou from '../models/Ou.js';      
import verifyToken from '../verifyToken/verifyToken.js';

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, password, ou } = req.body;

    // Check if required fields are provided
    if (!username || !password || !ou) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate the OU
        const existingOU = await Ou.findById(ou);
        if (!existingOU) {
            return res.status(400).json({ message: 'Invalid OU ID' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            role: 'normal',
            ou, 
        });

        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username, role: newUser.role, ou: newUser.ou } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username }).populate('ou'); 

        if (!user) {       
            return res.status(401).json({ message: 'Invalid credentials' });       
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });  
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id, role: user.role, ou: user.ou }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Respond with token and user data
        res.json({ token, user: { username: user.username, role: user.role, ou: user.ou } });
        
    } catch (error) {
        console.error('Error during login:', error); 
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

// Protected route example
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('ou');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ username: user.username, role: user.role, ou: user.ou });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// export the app to be used in other parts of this code
export default router;
