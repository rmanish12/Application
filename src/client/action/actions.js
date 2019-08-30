import {LOGIN_SUCCESSFUL, LOGIN_ERROR, GET_BOOKS, BOOK_FETCH_ERROR,
        ADD_BOOK, ADD_BOOK_ERROR, PURCHASE_SUCCESS,
        PURCHASE_ERROR} from './types'

import axios from 'axios'
import _ from 'lodash'
import history from '../history' 

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*"
}

export const onLogin = (email, password) => dispatch => {
    axios.post('http://localhost:8000/login', {email, password}, headers)
        .then(response => {
                dispatch({
                    type: LOGIN_SUCCESSFUL,
                    payload: {
                        email: response.data.email,
                        role: response.data.role
                    }
                }
            )
            history.push('/home')
        }, (err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    errMsg: _.get(err, 'response.data.message')
                }
            })
        })
}

export const fetchAllBook = () => dispatch => {
    axios.get('http://localhost:8000/books', headers)
        .then(response => {
            dispatch({
                type: GET_BOOKS,
                payload: {
                    books: response.data.books
                }
            })
        }, err => {
            dispatch({
                type: BOOK_FETCH_ERROR,
                payload: {
                    fetchError: _.get(err, 'response.data.message')
                }
            })
        })
}

export const addBook = (title, description, price, units) => dispatch => {
    axios.post('http://localhost:8000/addBook', {title, description, price, units}, headers)
        .then(response => {
            dispatch({
                type: ADD_BOOK,
                payload: {
                    bookAdded: response.data.message
                }
            })
        }, err => {
            dispatch({
                type: ADD_BOOK_ERROR,
                payload: {
                    addBookError: _.get(err, 'response.data.message')
                }
            })
        })
}

export const purchaseBook = (email, bookId) => dispatch => {
    axios.post('http://localhost:8000/purchase', {email, bookId}, headers)
        .then(response => {
            dispatch({
                type: PURCHASE_SUCCESS,
                payload: {
                    message: response.data.message
                }
            })
        }, err => {
            dispatch({
                type: PURCHASE_ERROR,
                payload: {
                    message: _.get(err, 'response.data.message')
                }
            })
        })
}

// export const fetchUserDetails = () => dispatch => {
//     axios.get('http://localhost:8000/api/user', headers)
//         .then((response) => {
//             console.log(response)
//             dispatch({
//                 type: GET_USER,
//                 payload: {
//                     name: response.data.user.name,
//                     role: response.data.user.role
//                 }
//             }, (err) => {
//                 console.log(err)
//             })
//         })
// }

export const onLogout = () => dispatch => {
    axios.post('http://localhost:8000/api/logout', {}, headers)
        .then(() => {
            dispatch({
                type: LOGOUT
            })
        })
}

export const onRegister = (email, password) => dispatch => {

    axios.post('http://localhost:8000/register', {email, password}, headers)
        .then((response) => {
            console.log(response) 
            dispatch({
                type: REGISTER,
                payload: {
                    message: response.data.message
                }
            })
        }, (err) => {
            console.log(_.get(err, 'response.data.message'))
            dispatch({
                type: REGISTER,
                payload: {
                    message: _.get(err, 'response.data.message')
                }
            })
        })
}