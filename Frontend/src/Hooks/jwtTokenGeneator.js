import { randomBytes } from 'crypto';

// Function to generate a random string token
export const generateToken = (length = 32) => {
    return randomBytes(length).toString('hex'); // Generate a random token in hex format
};
