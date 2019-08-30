import React, {Component} from 'react'
import autobind from 'react-autobind'

import { Table, Button } from 'react-bootstrap'

import AddBook from './AddBook'

class Admin extends Component {

    constructor(props) {
        super(props)

        autobind(this)

        state = {
            show: false
        }
    }

    displayAllBooks() {
        this.props.books.map(book => {
            return (
                <tr>
                    <td>{book.title}</td>
                    <td>{book.description}</td>
                    <td>{book.price}</td>
                    <td>{book.units}</td>
                </tr>
            )
        })
    }

    onSubmit(event) {
        event.preventDefault()

        this.setState({
            show: true
        })
    }

    onClose() {
        this.setState({
            show: false
        })
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
                            <th>Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayAllBooks()}
                    </tbody>
                </Table>

                <hr/>

                <Button className = "button">Add New Book</Button>

                <AddBook show = {this.state.show} onClose = {this.onClose}/>
            </React.Fragment>
        )
    }
}

export default Admin