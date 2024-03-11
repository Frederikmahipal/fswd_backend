import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
 },
 password: {
    type: String,
    required: true,
 },
 firstName: {
    type: String,
    required: true,
    trim: true,
 },
 lastName: {
    type: String,
    required: true,
    trim: true,
 },
});



const User = mongoose.model('User', userSchema);

export default User;
