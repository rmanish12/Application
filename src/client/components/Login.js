import React, {Component} from 'react'

import autobind from 'react-autobind'
import {Container, Col, Row, Card, Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import '../styles/Login.css'
import {onLogin} from '../action/actions'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            enabled: false,
            email: '',
            password: '',
            errorBox: false
        }

        autobind(this)
    }

    isNotEmpty() {
        const {email, password} = this.state

        if(email.length>0 && password.length>0) {
            this.setState({
                enabled: true
            })
        } else {
            this.setState({
                enabled: false
            })
        }
    }

    onEmailChange(event) {
         this.setState({
            email: event.target.value
        }, () => this.isNotEmpty())   
    }

    onPasswordChange (event) {
        this.setState({
            password: event.target.value
        }, () => this.isNotEmpty())
    }

    onSubmit(event){
        event.preventDefault()

        const {email, password} = this.state
        this.props.onLogin(email, password)

    }

    isError() {
        if(this.props.auth.loginErrMsg!=null) {
            return (
                <div className='invalid' hidden={!this.state.errorBox}>
                    <p>{this.props.auth.loginErrMsg}</p>
                </div>
            )
        }    
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col md = {6} xs={12} lg = {4}>
                        <div className='center'>
                            <div className='verticalCenter'>
                                <h4>Account Login</h4>
                                <hr/>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Email" 
                                            value = {this.state.email}
                                            onChange = {this.onEmailChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" 
                                            value = {this.state.password}
                                            onChange = {this.onPasswordChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" className='button' type="submit"
                                        disabled={!this.state.enabled}
                                        onClick={this.onSubmit}
                                    >
                                        Sign In
                                    </Button>
                                </Form>
                                
                                <br/>

                                <div>
                                    {this.isError()}
                                </div>

                                <div className='invalid' >
                                    <p>{this.props.auth.loginErrMsg}</p>
                                </div>

                                <div className='help'>
                                    Forgot Password? <Link to=''>Click Here</Link>
                                    <br/>
                                    Create an account? <Link to='/register'>Click Here</Link>
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
        onLogin: (email, password) => dispatch(onLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)