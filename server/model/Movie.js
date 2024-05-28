const mongoose = require('mongoose');
const {Schema} = mongoose;

const titleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

const Movie = mongoose.model('Movie', titleSchema);

module.exports = Movie;