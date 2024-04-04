import express from 'express';
import authJwt from '../middleware/auth.js';

const router = express.Router();

router.get('/check-auth', authJwt, (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});
export default router;