import dotenv from 'dotenv';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { keys } from '../config/keys.js';

dotenv.config();
const { database } = keys;

const setupDB = async () => {
  try {
    // Ensure the database URL is defined
    if (!database.url) {
      throw new Error('Database URL is not defined in the configuration.');
    }
    
    await mongoose.connect(database.url);

    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  } catch (error) {
    console.error(`${chalk.red('✗')} ${chalk.yellow('MongoDB Connection Error:')} ${error.message}`);
    // Optionally rethrow the error or handle it as needed
  }
};

export default setupDB;
