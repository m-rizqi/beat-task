const dotenv = require('dotenv');
const path = require('path');

process.env.NODE_ENV = 'dev';

dotenv.config({
  path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'beat-task',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
};
