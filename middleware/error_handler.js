import mongoose from 'mongoose';

export default function errorHandler(err, req, res, next) {
    console.error(err.stack);
    if (err instanceof mongoose.Error.ValidationError) {
   
       res.status(400).json({ message: 'Validation error', error: err.errors });
    } else {
       
       res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
    }
   }
   