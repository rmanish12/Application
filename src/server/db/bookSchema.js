const Sequelize = require('sequelize')
const sequelize = require('./config')

const Book = sequelize.define('books', {
    title: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER,
        required: true
    },
    units: {
        type: Sequelize.INTEGER,
        required: true
    }
});

//creates table
Book.sync().then(() => {

})

module.exports = Book