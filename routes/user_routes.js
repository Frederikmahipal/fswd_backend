import express from 'express';
import User from '../models/user_models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Company from '../models/company_models.js';

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
      const domain = email.split('@')[1].trim();
      const company = await Company.findOne({ company_email: { $regex: new RegExp(domain, 'i') } });

      if (company) {
         company.employees.push(user._id);
         await company.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'User created successfully', token });
   } catch (error) {
      res.status(500).json({ message: error.message || 'Server error' });
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

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName, role: user.role });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});

router.post('/signout', (req, res) => {
   //stateless, remove on client
   res.status(200).json({ message: 'User signed out successfully' });
});

router.delete('/delete/:id', async (req, res) => {
   try {
      const userToDelete = await User.findById(req.params.id);
      if (!userToDelete) {
         return res.status(400).json({ message: 'User not found' });
      }
      await userToDelete.remove();
      res.status(200).json({ message: 'User deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});

export default router;