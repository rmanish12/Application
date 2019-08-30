import React, {Component} from 'react'

import { Route, Switch } from 'react-router-dom'

import LandingPage from './LandingPage'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Home from './Home'

import '../styles/Homepage.css'

class Homepage extends Component {
    render() {
        return(
            <div>
                <Header/>

                <Switch>
                    <Route path='/' exact component={LandingPage}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/logout' component={LandingPage}/>
                </Switch>
            </div>
        )
    }
}

export default Homepage