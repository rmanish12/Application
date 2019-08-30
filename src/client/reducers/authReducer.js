import {LOGIN_SUCCESSFUL, LOGIN_ERROR, GET_BOOKS,
        BOOK_FETCH_ERROR, ADD_BOOK_ERROR, ADD_BOOK,
        PURCHASE_SUCCESS,
        PURCHASE_ERROR} from '../action/types'

export default function authReducer(state = {}, action) {
    switch(action.type) {

        case LOGIN_SUCCESSFUL: 
            return {
                ...state,
                email: action.payload.email,
                role: action.payload.role
            }

        case LOGIN_ERROR:
            return {
                ...state,
                loginErrMsg: action.payload.errMsg
            }

        case GET_BOOKS:
            return {
                ...state,
                books: action.payload.books
            }

        case BOOK_FETCH_ERROR:
            return {
                ...state,
                booksErr: action.payload.fetchError
            }

        case ADD_BOOK:
            return {
                ...state,
                bookAddedSuccessfully: action.payload.bookAdded
            }

        case ADD_BOOK_ERROR:
            return {
                ...state,
                bookAdditionFailure: action.payload.addBookError
            }

        case PURCHASE_SUCCESS:
            return {
                ...state,
                purchaseSuccess: action.payload.message
            }

        case PURCHASE_ERROR:
            return {
                ...state,
                purchaseError: action.payload.message
            }

        // case GET_USER:
        //     return {
        //         ...state,
        //         name: action.payload.name,
        //         role: action.payload.role
        //     }

        // case REGISTER:
        //     console.log('reducer: ', action.payload.message)
        //     return {
        //         ...state,
        //         message: action.payload.message
        //     }

        case LOGOUT:
            return {}

        default:
            return state
    }
}