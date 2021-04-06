const {Schema, model} = require('mongoose');

const SongSchema = new Schema({
    tabs: {
        type: String,
        required: true,
        default: '',
    },
    chords: {
        type: String,
        required: true,
        default: '',
    },
    lyrics: {
        type: String,
        required: true,
        default: '',
    }
})

module.exports = model('Song',SongSchema);