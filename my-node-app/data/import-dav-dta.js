const fs= require('fs')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour= require('./../models/tourmodel')
if (!process.env.DATABASE) {
    throw new Error('DATABASE environment variable is not defined');
}

// const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// mongoose.connect(DB, {
mongoose.connect(process.env.DATABASE_LOCAL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
}).then((con) => {
    con
    console.log('DB connection successful');
}).catch(err => {
    console.error('DB connection error:', err);
});
const tours= fs.readFileSync('tours-simple.json','utf-8')
