import React, {Component} from 'react'

import {connect} from 'react-redux'
import autobind from 'react-autobind'
import {Container, Col, Row, Card, Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import '../styles/Login.css'
import {onRegister} from '../action/actions'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            buttonDisable: true,
            errorBox: false,
            registerMsg: ''
        }

        autobind(this)
    }

    onFirstNameChange(event) {
        this.setState({
            firstname: event.target.value
        }, () => this.isNotEmpty())
    }

    onLastNameChange(event) {
        this.setState({
            lastname: event.target.value
        })
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value
        }, () => this.isNotEmpty())
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        }, () => this.isNotEmpty())
    }

    onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        }, () => this.isNotEmpty())
    }

    onSubmit(event) {
        event.preventDefault()

        const {password, confirmPassword, firstname, lastname, email} = this.state

        if(password!==confirmPassword) {
            this.setState({
                errorBox: true
            })
        } else {
            this.props.onRegister(email, password, firstname, lastname)

            if(this.props.auth.err!=null) {
                this.setState({
                    registerMsg: this.props.auth.err
                })
            } else {
                this.setState({
                    registerMsg: this.props.auth.msg
                })
            }
        }
    }

    isNotEmpty() {
        const {firstname, email, password, confirmPassword} = this.state

        if(firstname.length>0 && password.length>0 && email.length>0 && confirmPassword.length>0) {
            this.setState({
                buttonDisable: false
            })
        } else {
            this.setState({
                buttonDisable: true
            })
        }
    }

    isSuccessful() {
        if(this.props.auth.message!=null) {
            const style = this.props.auth.message==='Registered successfully'? 'valid' : 'invalid'
            console.log(style)
            return (
                <div className={style}>
                    <p>{this.props.auth.message}</p>
                </div>
            )
        }
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col></Col>
                    <Col md = {6} xs={12} lg = {4}>
                        <div className='center'>
                            <div className='verticalCenter'>
                                <h4>Account Register</h4>
                                <hr/>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="First Name" 
                                            value={this.state.firstname}
                                            onChange={this.onFirstNameChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Last Name" 
                                            value={this.state.lastname}
                                            onChange={this.onLastNameChange}
                                        />
                                    </Form.Group>

                                   <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Email id" 
                                            value={this.state.email}
                                            onChange={this.onEmailChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" 
                                            value={this.state.password}
                                            onChange={this.onPasswordChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Confirm Password" 
                                            value={this.state.confirmPassword}
                                            onChange={this.onConfirmPasswordChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" className='button' type="submit"
                                        disabled={this.state.buttonDisable}
                                        onClick={this.onSubmit}
                                    >
                                        Register
                                    </Button>
                                </Form>

                                <br/>
                                
                                <div className='invalid' hidden={!this.state.errorBox}>
                                    <p>Password does not match.</p>
                                </div>

                                <div>
                                    {this.isSuccessful()}
                                </div>

                                <br/>

                                <div className='help'>
                                    Already Have An Account? <Link to='/login'>Click Here</Link>
                                </div>
                            </div>
                        </div>                                   
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
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
        onRegister: (email, password, firstname, lastname) => dispatch(onRegister(email, password, firstname, lastname))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)