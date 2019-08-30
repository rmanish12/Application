const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    units: {
        type: Number,
        required: true
    }
})

const book = mongoose.model('books', bookSchema)

module.exports = book

