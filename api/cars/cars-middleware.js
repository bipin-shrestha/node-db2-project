const ExpressError = require('../ExpressError.js');
const express = require('express');
const Cars = require('./cars-model.js');
const vinValidator = require('vin-validator');


exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Cars.getById(req.params.id);
    console.log(car);
    if(car.length > 0){
      req.car = car;
      next();
    } else {
      next(new ExpressError('Car with id ' +req.params.id+ ' is not found', 404 ));
    }
  }
  catch (err){
    next(new ExpressError('body validation error: ' + err.message, 500))
  }
}

exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
 const newCar = req.body;
 if (newCar.vin == '' || newCar.make == '' || newCar.model == '' || newCar.mileage == '' || newCar.title == '' || newCar.transmission == ''){
   const err = new ExpressError();
   if(newCar.vin == ''){
    err = new ExpressError(`Vin is missing`, 400)
   }
   if(newCar.make == ''){
    err = new ExpressError(`Make is missing`, 400)
   } 
   if(newCar.model == ''){
    err = new ExpressError(`Mode is missing`, 400)
   }    
   if(newCar.mileage == ''){
    err = new ExpressError(`Mileage is missing`, 400)
   }   
   if(newCar.title == ''){
    err = new ExpressError(`Title is missing`, 400)
   }    
   if(newCar.transmission == ''){
    err = new ExpressError(`Transmission is missing`, 400)
   }    
   next(err);
 } else {
   next();
 }
}

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValidVin = vinValidator.validate(req.body.vin);
  if(isValidVin){
    next();
  }else {
    next(new ExpressError(`Vin ${req.body.vin} is invalid`, 400))
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const vinList = await Cars.getAll();
    const vinToCheck = req.body.vin;
    if( vinList.filter(data => data.vin === vinToCheck).length == 0 ){
      next();
    } else {
      next({ mesage :"vin <vin number> already exists", status: 400})
    }
  }
  catch(error) {
    next(new ExpressError('body validation error: ' + err.message, 500))
  }

}

