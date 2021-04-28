const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    group: {
        type: String,
        required: true,
        default: '',
    },
    number: {
        type: String,
        required: true,
        default: '+37400000000',
    },
    email: {
        type: String,
        required: true,
        default: '',
    }
}
,{
    timestamps: true
});

module.exports = model('Post', PostSchema);