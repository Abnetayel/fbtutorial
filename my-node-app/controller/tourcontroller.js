// import fs from 'fs';
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`, 'utf-8'));
 
exports.checkID=(req,res,next,val)=>{
    console.log(`Tour id is ${val}`);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }
    next();
}
exports.getAllTours = (req, res) => {
    console.log(`Request time is ${req.requestTime}`);
    try {
        res.status(200).json({
            status: 'success',
            results: tours.length,
            time: req.requestTime,
            data: { tours }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

exports.getSpecificTour = (req, res) => {
    // const id = parseInt(req.params.id, 10);
    // const id = req.params.id * 1;
    // const tour = tours.find(el => el.id === id);
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID',
    //         data: null
    //     });
    // }
    const { tour } = req;
    res.json({
        status: 'success',
        data: { tour }
    });
};

exports.postTour = (req, res) => {
    try {
        const tourId = tours.length ? tours[tours.length - 1].id + 1 : 1;
        const newTour = { id: tourId, ...req.body };
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

exports.patchTour = (req, res) => {
    // const id = parseInt(req.params.id, 10);
   const { tour } = req;

    Object.assign(tour, req.body);
    fs.writeFile(`${__dirname}/../data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) throw err;
        res.status(200).json({
            status: 'success',
            data: { tour }
        });
    });
};

exports.deleteTour = (req, res) => {
    // const id = parseInt(req.params.id, 10);
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
