import express from 'express';
import User from '../models/user_models.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import authJwt from '../middleware/auth.js';

const router = express.Router();


router.post('/signup', async (req, res) => {
   try {
      const { email, password, firstName, lastName } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashedPassword, firstName, lastName });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'User created successfully', token });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});


router.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: 'User does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }


      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


      res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});


router.post('/signout', (req, res) => {
   //stateless, remove on client
   res.status(200).json({ message: 'User signed out successfully' });
  });


export default router;