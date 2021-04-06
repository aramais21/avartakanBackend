const {Router} = require('express');
const { concertValidator, validate } = require('../middleware/reqValidator');
const Concert = require('../models/Concert');

const route = Router();

route.get(
    '/',
    async (req,res) => {
        try {
            const data = await Concert.find();
            res.status(200).json({data});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

route.get(
    '/:id',
    async (req,res) => {
        try {
            const {id} = req.params;
            const data = await Concert.findById(id);
            if(!data) {
                res.status(400).json({error: 'there is no Concert with that id'});
                return;
            }
            res.status(200).json({data});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

route.post(
    '/',
    concertValidator(),
    validate,
    async (req,res) => {
        try {
            const {name, group, genre, date, price} = req.body;
            const hypoConcert = await Concert.findOne({name});
            if(hypoConcert) {
                res.status(400).json({error: 'there is already a concert with this name'});
                return
            }
            if(date < new Date()) {
                res.status(400).json({error: 'you can\'t create an event in the past'});
                return;
            }
            const newConcert = new Concert({name, group, genre, date, price});
            await newConcert.save();
            res.status(200).json({message: 'created a new concert'});
            return ;
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

route.delete(
    '/:id',
    async (req,res) => {
        try {
            const {id} = req.params;
            await Concert.findByIdAndDelete(id);
            res.status(200).json({message: `successfully deleted the Concert with id: ${id}`});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

route.put(
    '/:id',
    concertValidator(),
    validate,
    async (req,res) => {
        try {
            const {id} = req.params;
            const {name, group, genre, date, price} = req.body;
            await Concert.findByIdAndUpdate(id, {name, group, genre, date, price});
            res.status(200).json({message: `successfully updated the Concert with id: ${id}`});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

module.exports = route;