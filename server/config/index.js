import dotenv from 'dotenv';
dotenv.config();

export const { port_no, DEBUG_MODE, JWT_SECRET, REFRESH_SECRET, APP_URL } = process.env;