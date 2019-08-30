import React, {Component} from 'react'
import {Router} from 'react-router-dom'

import RoutingPage from './RoutingPage'
import history from '../history'

class App extends Component {
    render() {
        return(
            <Router history={history}>
                <RoutingPage/>
            </Router>
        )
    }
}

export default App