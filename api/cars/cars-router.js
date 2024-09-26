// DO YOUR MAGIC
const express = require('express')
const carModel = require('../cars/cars-model.js');
const ExpressError = require('../ExpressError.js');
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware.js');

router.get('/', async (req, res, next) => {
    try{
        const cars = await carModel.getAll();
        res.status(200).json(cars);
    }
    catch(err) {
        next(new ExpressError(err, 500))
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try{
        res.status(200).json(req.car)
    }
    catch(err){
        next(new ExpressError(err, 500))
    }
})

router.post('/', checkVinNumberValid, checkVinNumberUnique, checkCarPayload, async (req, res, next) => {
    req.body.vin= req.body.vin.trim();
    try{
        const newCar = await carModel.create(req.body);
        res.status(201).json(newCar);
    }
    catch(err){
        next(new ExpressError(err, 500))
    }
});

router.put('/:id', checkCarId, checkVinNumberValid, checkVinNumberUnique, checkCarPayload, async (req, res, next) => {
    try{
        const car = await carModel.updateById(req.params.id, req.body);
        res.status(201).json(car);
    }
    catch (err) {
        next(new ExpressError(err, 500))
    }
})

router.delete('/:id', checkCarId, async (req, res, next) => {
    try{
        await carModel.deleteById(req.params.id);
        res.status(204).send("");
    }
    catch(err) {
        next(new ExpressError(err, 500))
    }
})
module.exports = router ;
