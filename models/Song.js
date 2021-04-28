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
    },
    group: {
        type: String,
        required: true,
        default: ''
    },
    song: {
        type: String,
        required: true,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = model('Song',SongSchema);