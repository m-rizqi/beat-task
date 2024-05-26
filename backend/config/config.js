const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET || 'beat-task',
    DATABASE_HOST: process.env.DATABASE_HOST || 'mongodb+srv://BeatTaskSenPro:aDqVlmWQE8KZIwCH@beat-task.c1wp0og.mongodb.net/?retryWrites=true&w=majority&appName=Beat-Task',
}