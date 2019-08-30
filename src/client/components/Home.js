import React, {Component} from 'react'
import autobind from 'react-autobind'
import {connect} from 'react-redux'

import Admin from './AdminPage'
import User from './UserPage'

import {fetchAllBook} from '../action/actions'

class Home extends Component {

    constructor(props) {
        super(props)

        autobind(this)
    }

    componentWillMount() {
        this.props.fetchAllBook()
    }

    displayPage() {
        if(this.props.auth.authrole==='ADMIN') {
            return <Admin role = {this.props.auth.role} books = {this.props.auth.books}/>
        } else if(this.props.auth.role==='USER') {
            return <User role = {this.props.auth.role} books = {this.props.auth.books}/>
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.displayPage()}
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
        fetchAllBook: () => dispatch(fetchAllBook())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)