import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db.js'; 
import { seedUsers } from './seeders/seed_users.js';
import { seedCompanies } from './seeders/seed_companies.js';

dotenv.config();

async function deleteAllCollections() {
 const collections = mongoose.connection.collections;
 for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
 }
 console.log('All collections deleted');
}

async function seedDatabase() {
 await connectDB(); 
 await deleteAllCollections(); 
 const users = await seedUsers(); // Seed users first to get their IDs
 const companies = await seedCompanies(users.map(user => user._id)); // Pass user IDs to seedCompanies
 console.log('Database seeded with users:', users, companies);
}

seedDatabase().catch(console.error);
