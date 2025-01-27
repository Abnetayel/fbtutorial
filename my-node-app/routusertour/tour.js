// import express from 'express';
const express = require('express');
const { getAllTours, postTour, getSpecificTour, patchTour, deleteTour } = require('../controller/tourcontroller.js');

const tourRouter = express.Router();
// tourRouter.param('id',checkID)
tourRouter.route('/')
    .get(getAllTours)
    .post(postTour);
tourRouter.route('/:id')
    .get(getSpecificTour)
    .patch(patchTour)
    .delete(deleteTour);
module.exports = tourRouter;
