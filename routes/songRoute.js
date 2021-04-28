const {Router} = require('express');
const { songValidator, validate } = require('../middleware/reqValidator');
const Song = require('../models/Song');

const route = Router();

route.get(
    '/',
    async (req,res) => {
        try {
            const data = await Song.find().sort({createdAt: 'desc'});
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
            const data = await Song.findById(id);
            if(!data) {
                res.status(400).json({error: 'there is no Song with that id'});
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
    songValidator(),
    validate,
    async (req,res) => {
        try {
            const {tabs, chords, lyrics, group, song} = req.body;
            const newSong = new Song({tabs, chords, lyrics, group, song});
            await newSong.save();
            res.status(200).json({message: 'created a new Song'});
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
            await Song.findByIdAndDelete(id);
            res.status(200).json({message: `successfully deleted the Song with id: ${id}`});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

route.put(
    '/:id',
    songValidator(),
    validate,
    async (req,res) => {
        try {
            const {id} = req.params;
            const {tabs, chords, lyrics} = req.body;
            await Song.findByIdAndUpdate(id, {tabs, chords, lyrics});
            res.status(200).json({message: `successfully updated the Song with id: ${id}`});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

module.exports = route;