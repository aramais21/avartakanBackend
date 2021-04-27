const {Schema, model} = require('mongoose');

const ConcertSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: '',
        unique: true,
    },
    group: {
        type: String,
        required: true,
        default: '',
    },
    genre: {
        type: String,
        required: true,
        default: '',
    },
    date: {
        type: String,
        required: true,
        default: '',
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
})


module.exports = model('Concert', ConcertSchema);