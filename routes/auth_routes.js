import express from 'express';
import authJwt from '../middleware/auth.js';

const router = express.Router();

router.get('/check-auth', authJwt, (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
});

export default router;