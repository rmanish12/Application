const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
    book_id: {
        type: Number,
        required: true
    },
    email_id: {
        type: String,
        required: true
    }
})

const purchase = mongoose.model('purchase', purchaseSchema)

module.exports = purchase