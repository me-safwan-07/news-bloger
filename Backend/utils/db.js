import dotenv from 'dotenv';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { keys } from '../config/keys.js';

dotenv.config();
const { database } = keys;

const setupDB = async () => {
  try {
    console.log('Database URL:', database.url); // Log the URL for debugging
    await mongoose.connect('mongodb://localhost:27017/news-blog', {
      useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false
    });
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  } catch (error) {
    console.error(`${chalk.red('✗')} ${chalk.yellow('MongoDB Connection Error:')} ${error.message}`);
  }
};

export default setupDB;
