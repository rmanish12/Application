import React, {Component} from 'react'
import autobind from 'react-autobind'
import connect from 'react-redux'

import {purchaseBook} from '../action/actions'

class User extends Component {

    constructor(props) {
        super(props)

        autobind(this)
    }

    displayAllBooks() {
        this.props.books.map(book => {
            return (
                <tr>
                    <td>{book.title}</td>
                    <td>{book.description}</td>
                    <td>{book.price}</td>
                    <td><Button onClick = {this.purchase(book._id)}>Buy</Button></td>
                </tr>
            )
        })
    }

    puchase(event, id) {
        event.preventDefault()

        this.props.purchaseBook(this.props.auth.email, id)
    }

    render() {
        return (
            <React.Fragment>
                Welcome {this.props.role}

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayAllBooks()}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBook: (email, bookId) => dispatch(purchaseBook(email, bookId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)