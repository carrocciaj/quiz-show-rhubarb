import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect
// } from 'react-router-dom
import LoginArea from './LoginArea'
import RegisterArea from './RegisterArea'
import 'bulma/css/bulma.css'
import './App.css'
import data from './data'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }

    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token')
    if (username && token) {
      this.state.currentUser = { username, token }
      data.setUserToken(token)
    }

    this.setCurrentUser = this.setCurrentUser.bind(this)
    // this.logout = this.logout.bind(this)
  }

  setCurrentUser (user) {
    window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user.token)
    this.setState({ currentUser: user })
  }

  // logout () {
  //   data.setUserToken(null)
  //   window.localStorage.clear()
  //   this.setState({
  //     currentUser: null
  //   })
  // }

  render () {
    const { currentUser } = this.state
    return (
      <React.Fragment>
        <div className='quiz-container'>
          <div className='quiz-head'>Quiz Rhubarb</div>
          <LoginArea />
          <RegisterArea />
        </div>
      </React.Fragment>
    )
  }
}

export default App
