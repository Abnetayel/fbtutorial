const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`, 'utf-8'));
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});
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
        fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
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
    fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
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
    fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) throw err;
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
};
const tourRouter = express.Router();
tourRouter.route('/')
    .get(getAllTours)
    .post(postTour);

    tourRouter.route('/:id')
    .get(getSpecificTour)
    .patch(patchTour)
    .delete(deleteTour);
    module.exports=tourRouter