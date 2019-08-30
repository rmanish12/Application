import React from 'react'
import autobind from 'react-autobind'
import connect from 'react-redux'

import {Modal, Form} from 'react-bootstrap'

import {addBook} from '../action/actions'

class AddBook extends React.Component {

    constructor(props) {
        super(props)

        state = {
            title: '',
            description: '',
            price: 0,
            units: 0
        }

        autobind(this)
    }

    onTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    onDescriptionChange(event) {
        this.setState({
            description: event.target.description
        })
    }

    onPriceChange(event) {
        this.setState({
            price: event.target.price
        })
    }

    onUnitsChange(event) {
        this.setState({
            units: event.target.units
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const {title, description, price, units} = this.state
        this.props.addBook(title, description, price, units)
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    show = {this.props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Add New Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="title">
                                <Form.Control type="text" placeholder="Title" 
                                    value = {this.state.title}
                                    onChange = {this.onTitleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Control type="text" placeholder="Description" 
                                    value = {this.state.description}
                                    onChange = {this.onDescriptionChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Control type="number" placeholder="Price" 
                                    value = {this.state.price}
                                    onChange = {this.onPriceChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="units">
                                <Form.Control type="number" placeholder="Units" 
                                    value = {this.state.units}
                                    onChange = {this.onUnitsChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" className='button' type="submit"
                                disabled={!this.state.enabled}
                                onClick={this.onSubmit}
                            >
                                Add Book
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBook: (title, description, price, units) => dispatch(addBook(title, description, price, units))
    }
}

export default connect(null, mapDispatchToProps)(AddBook)