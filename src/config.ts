import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://sparta-admin:05fiFNNOVCHsO46s@cluster0.pklzxhl.mongodb.net/?retryWrites=true&w=majority',
  virusTotalApiKey: process.env.VIRUSTOTAL_API_KEY || '',
  whoisApiKey: process.env.WHOIS_API_KEY || '',
  scanInterval: process.env.SCAN_INTERVAL || '0 0 1 * *', // Monthly at midnight on the 1st
};
