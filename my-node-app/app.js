const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
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
// Load tours data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'));
const users =JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`,'uts-8'))
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
const getAllTours = (req, res) => {
    console.log(`Request time is ${req.requestTime}`);
    try {
        res.status(200).json({
            status: 'success',
            results: tours.length,
            time: req.requestTime,
            author: 'abnet',
            data: { tours }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};
const getSpecificTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }
    res.json({
        requestTime: req.requestTime,
        status: 'success',
        data: { tour }
    });
};

const postTour = (req, res) => {
    try {
        const tour = tours[tours.length - 1].id + 1;
        const newTour = { id: tour, ...req.body };
        tours.push(newTour);
        fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), (err) => {
            if (err) throw err;
            res.status(201).json({
                status: "success",
                data: { tour: newTour }
            });
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

const patchTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }

    Object.assign(tour, req.body);
    fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) throw err;
        res.status(200).json({
            status: 'success',
            data: { tour }
        });
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tourIndex = tours.findIndex(el => el.id === id);
    if (tourIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }

    tours.splice(tourIndex, 1);
    fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) throw err;
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
};

// Routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(postTour);

app.route('/api/v1/tours/:id')
    .get(getSpecificTour)
    .patch(patchTour)
    .delete(deleteTour);
app.route('/api/v1/users')
const PORT = 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
