import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
// import PropTypes from 'prop-types'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import LoginArea from './LoginArea'
// import TakeQuiz from './TakeQuiz'
import RegisterArea from './RegisterArea'
import Dashboard from './Dashboard'
import data from './data'
import TakeQuiz from './TakeQuiz'
// import { timingSafeEqual } from 'crypto'

class App extends Component {
  constructor (props) {
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
    this.logout = this.logout.bind(this)
  }

  setCurrentUser (user) {
    window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user.token)
    this.setState({ currentUser: user })
  }

  logout () {
    data.setUserToken()
    window.localStorage.clear()
    this.setState({
      currentUser: null
    })
    // added this on Monday nihght
  }

  render () {
    // if (!this.props.currentUser) {
    //   return <Redirect to='/login' />
    // }

    return (
    // Below is the temporary render of login and registration until routes are set
    // <div className='quiz-container'>
    //   <div className='quiz-head'>Quiz Rhubarb</div>
    //   <LoginArea setCurrentUser={this.setCurrentUser} />
    //   <RegisterArea setCurrentUser={this.setCurrentUser} />
    //   <Dashboard />
    // </div>

    // I'M TRYING TO GET THE ROUTER WORKING! WILL COME BACK TO THIS BECAUSE IT IS CRUCIAL!
      <Router>
        <div className='App'>
          <div className='Header'>
            <div className='quiz-head'>Quiz Rhubarb</div>
          </div>
          <main>
            <Route exact path='/' render={() => {
              if (this.state.currentUser) {
                return <Redirect to='/quizzes' />
              } else {
                return <Redirect to='/login' />
              }
            }} />

            <Route path='/login' render={() => {
              if (this.state.currentUser) {
                return <Redirect to='/quizzes' />
              } else {
                return <LoginArea setCurrentUser={this.setCurrentUser} />
              }
            }}
            />

            {/* <Route path='/register' render={() =>
              <RegisterArea setCurrentUser={this.setCurrentUser} />}
            /> */}

            <Route path='/register' render={() => {
              if (this.state.currentUser) {
                return <Redirect to='/quizzes' />
              } else {
                return <RegisterArea setCurrentUser={this.setCurrentUser} />
              }
            }}
            />

            <Route path='/quizzes' render={() => {
              if (!this.state.currentUser) {
                return <Redirect to='/login' />
              } else {
                return <Dashboard currentUser={this.state.currentUser} logout={this.logout} />
              }
            }}
            />

            <Route path='quiz/:id' render={() =>
              <TakeQuiz
                currentUser={this.state.currentUser} />}
            />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
