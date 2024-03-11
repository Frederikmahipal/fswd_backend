import mongoose from 'mongoose';

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
 role: {
    type: String,
    enum: ['employee', 'manager', 'admin'],
    default: 'employee',
 },
});

const User = mongoose.model('User', userSchema);

export default User;
