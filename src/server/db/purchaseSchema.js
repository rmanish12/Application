const Sequelize = require('sequelize')
const sequelize = require('./config')

const Purchase = sequelize.define('purchase', {
    book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    email_id: {
        type: Sequelize.STRING,
        required: true
    }
})

//creates table
Purchase.sync().then(() => {

})

module.exports = Purchase