import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 5000,
  DB_URI: process.env.DB_URI ?? 'postgres://postgres:st123@localhost:5432/vendordb',
  HELPER_API: process.env.HELPER_API ?? 'http://localhost:4000'
}

export default config;