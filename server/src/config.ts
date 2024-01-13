import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 5000,
  DB_URI: process.env.DB_URI ?? 'postgres://postgres:st123@localhost:5432/vendordb'
}

export default config;