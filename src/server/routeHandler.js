const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')

// const User = require('./db/models.js/Users')
// const Book = require('./db/models.js/Books')
// const Purchase = require('./db/models.js/Purchase')

const User = require('./db/userSchema')
const Book = require('./db/bookSchema')
const Purchase = require('./db/purchaseSchema')

const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res) => {
    try {
        const userExist = await User.findByPk(req.body.email)

        if(userExist) {
            return res.status(400).send({message: 'User already exists'})
        }
    
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    
        const newUser = {
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'USER'
        }

        console.log(newUser)
    
        User.create(user).then(data => {
            console.log('created')
        }).catch(e => {
            console.log(e)
        })
        
        return res.status(200).send({message: 'User successfully created'})
    } catch(err) {
        return res.status(500).send({message: 'Some internal error'})
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.email)

        if(!user) {
            return res.status(404).send({message: 'No user found'})
        }
    
        // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    
        if(!passwordIsValid) {
            return res.status(401).send({auth: false, token: null, message: 'Password invalid'})
        }
    
        var token = jwt.sign({ email: user.email }, SECRET_KEY, {
            expiresIn: 86400 //24hr
        })
    
        res.cookie('sessionToken', token, {
            httpOnly: true,
            maxAge: 4 * 60 * 60 * 1000 // 4 hours
          });
    
        return res.status(200).send({ email: user.email, role: user.role})
    } catch(err) {
        return res.status(500).send({message: 'Some internal error'})
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll()
    
        if(!books) {
            return res.status(404).send({message: 'No book found'})
        }
    
        return res.status(200).send({books: books}) 
    } catch(err) {
        return res.status(500).send({message: 'Some internal error'})
    }
}

const purchase = async (req, res) => {
    try {
        const newOrder = {
            email_id: req.body.email,
            book_id: req.body.bookId
        }

        const buy = await Purchase.create(newOrder)

        return res.status(200).send({message: 'Order has been successfully placed'}) 
    } catch(err) {
        return res.status(500).send({message: 'Some internal error'})
    }
}

const addBook = async (req, res) => {
    try {
        const book = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            units: req.body.units
        }

        const newBook = await Book.create(book)

        return res.status(200).send({message: 'Book has been successfully added'})
    } catch (err) {
        return res.status(500).send({message: 'Some internal error'})
    }
}

const logout = (req, res) => {
    res.clearCookie('sessionToken')
    res.status(200).send({auth: false, token: null})
}

// const register = async (req, res) => {
//     try {
//         const userExist = User.findOne({email: req.body.email})

//         if(userExist) {
//             return res.status(400).send({message: 'User already exists'})
//         }

//         const hashedPassword = bcrypt.hashSync(req.body.password, 8)

//         const newUser = await new User({
//             email: req.body.email,
//             password: hashedPassword
//         }).save()

//         return res.status(200).send({message: 'User successfully created'})
//     } catch(err) {
//         return res.status(500).send({message: 'Some internal error'})
//     }
// }

// const login = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             email: req.body.email
//         })
    
//         if(!user) {
//             return res.status(404).send({message: 'No user found'})
//         }
    
//         const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    
//         if(!passwordIsValid) {
//             return res.status(401).send({auth: false, token: null, message: 'Password invalid'})
//         }
    
//         var token = jwt.sign({ email: user.email }, SECRET_KEY, {
//             expiresIn: 86400 //24hr
//         })
    
//         res.cookie('sessionToken', token, {
//             httpOnly: true,
//             maxAge: 4 * 60 * 60 * 1000 // 4 hours
//           });
    
//         return res.status(200).send({ name: user.firstname, role: user.role})
//     } catch {
//         return res.status(500).send({message: 'Some internal error'})
//     }
// }

// const getAllBooks = async (req, res) => {
//     try {
//         const books = await Book.find().populate({
//             match: {units: {$gte: 0}}
//         })
    
//         if(!books) {
//             return res.status(404).send({message: 'No book found'})
//         }
    
//         return res.status(200).send({books: books}) 
//     } catch {
//         return res.status(500).send({message: 'Some internal error'})
//     }
// }

// const purchase = async (req, res) => {
//     try {
//         const order = new Purchase({
//             email: req.body.email,
//             book_id: req.body.bookId
//         })

//         const buy = await order.save()

//         return res.status(200).send({message: 'Order has been successfully placed'}) 
//     } catch {
//         return res.status(500).send({message: 'Some internal error'})
//     }
// }

// const addBook = async (req, res) => {
//     try {
//         const book = new Book({
//             title: req.body.title,
//             description: req.body.description,
//             price: req.body.price,
//             units: req.body.units
//         })

//         const newBook = await book.save()

//         return res.status(200).send({message: 'Book has been successfully added'})
//     } catch {
//         return res.status(500).send({message: 'Some internal error'})
//     }
// }

// module.exports = {createUser, getUser, loginUser, logout}
module.exports = { register, login, getAllBooks, purchase, addBook}