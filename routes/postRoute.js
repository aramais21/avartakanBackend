const {Router} = require('express');
const { postValidator, validate } = require('../middleware/reqValidator');
const Post = require('../models/Post');

const route = Router();

route.get(
    '/',
    async (req,res) => {
        try {
            const data = await Post.find().sort({createdAt: 'desc'});
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
            const data = await Post.findById(id);
            if(!data) {
                res.status(400).json({error: 'there is no Post with that id'});
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
    postValidator(),
    validate,
    async (req,res) => {
        try {
            const {group, email, number} = req.body;
            const newPost = new Post({group, email, number});
            await newPost.save();
            res.status(200).json({message: 'created a new Post'});
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
            await Post.findByIdAndDelete(id);
            res.status(200).json({message: `successfully deleted the Post with id: ${id}`});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

route.put(
    '/:id',
    postValidator(),
    validate,
    async (req,res) => {
        try {
            const {id} = req.params;
            const {group, email, number} = req.body;
            await Post.findByIdAndUpdate(id, {group, email, number});
            res.status(200).json({message: `successfully updated the Post with id: ${id}`});
        }
        catch (err) {
            res.status(400).json({error: err});
            return;
        }
    }
)

module.exports = route;