const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const userRouter =require('./routusertour/user')
const tourRouter =require('./routusertour/tour')
const { on } = require('events');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); 
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});
app.use((req, res, next) => {
    console.log('Hello from the second middleware 👋');
    req.requestTime = new Date().toISOString();
    next();
});
app.post('/api/v1/auth/login',(req,res)=>{
    const{email,password}= req.body
    console.log(`helle ${email}`);
    res.send(`helle ${email} wellcome to your page`)
})
app.post('/api/v1/auth/signup',(req,res)=>{
    const{name,email,password}=req.body
    console.log(`wellcome to this channel ${name}`);
    res.send(`wellcome to this channel ${name} you have successfully signed up`)
    
})
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter);
const PORT = 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
