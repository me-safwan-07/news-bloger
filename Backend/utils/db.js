import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { keys } from '../config/keys.js';

dotenv.config();
const { database } = keys;

const setupDB = async () => {
  try {
    // Ensure the database URL is defined
    if (!process.env.MONGO_URI) {
      throw new Error('Database URL is not defined in the configuration.');
    }
    
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected!');
  } catch (error) {
    console.error(`MongoDB Connection Error:'`);
    // Optionally rethrow the error or handle it as needed
  }
};

export default setupDB;
