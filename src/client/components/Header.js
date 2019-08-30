import React, {Component} from 'react'
import {connect} from 'react-redux'
import autobind from 'react-autobind'

import { Link } from 'react-router-dom'
import {Navbar, Form, Nav, FormControl, Button, NavDropdown} from 'react-bootstrap'

import {onLogout} from '../action/actions'

import '../styles/Header.css'

class Header extends Component {

    constructor(props) {
        super(props)

        autobind(this)
    }

    displayHeader() {
        if(this.props.auth!=null) {
            if(this.props.auth.email!=null) {
                let title = 'Welcome ' + this.props.auth.email
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Nav>
                            <NavDropdown title={title} id="basic-nav-dropdown">
                                {/* <NavDropdown.Item onClick ={this.props.onLogout}> */}
                                    <Link to='/'  onClick={this.props.onLogout} className='link'>Logout</Link>
                                    {/* Logout */}
                                {/* </NavDropdown.Item> */}
                            </NavDropdown>                
                        </Nav>
                    </Navbar.Collapse>
                )
            } else {
                return (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
    
                        </Nav>
                        <Nav>
                            <Link to='/login' className='link'>Login</Link>
                            <Link to='/register' className='link'>Register</Link>
                        </Nav>
                    </Navbar.Collapse>
                )
            }
        } 
    }

    render() {
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Link to='/' className='brand'>Brand Name</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {this.displayHeader()}
                </Navbar>
            </div>
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
        onLogout: () => dispatch(onLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)