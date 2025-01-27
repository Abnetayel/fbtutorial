const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRouter = require('./routusertour/user.js');
const tourRouter = require('./routusertour/tour.js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});
app.use((req, res, next) => {
    console.log('Hello from the second middleware 👋');
    req.requestTime = new Date().toISOString();
    next();
});

app.post('/api/v1/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Hello ${email}`);
    res.send(`Hello ${email}, welcome to your page`);
});

app.post('/api/v1/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Welcome to this channel ${name}`);
    res.send(`Welcome to this channel ${name}, you have successfully signed up`);
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
 module.exports = app;