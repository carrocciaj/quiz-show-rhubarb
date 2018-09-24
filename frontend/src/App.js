import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
// import PropTypes from 'prop-types'
// import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import LoginArea from './LoginArea'
import RegisterArea from './RegisterArea'
import Dashboard from './Dashboard'
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
    this.logout = this.logout.bind(this)
  }

  setCurrentUser (user) {
    window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user.token)
    this.setState({ currentUser: user })
  }

  logout () {
    data.setUserToken(null)
    window.localStorage.clear()
    this.setState({
      currentUser: null
    })
  }

  render () {
    // const { currentUser } = this.state
    return (
    // Below is the temporary render of login and registration until routes are set
      <React.Fragment>
        <div className='quiz-container'>
          <div className='quiz-head'>Quiz Rhubarb</div>
          <LoginArea setCurrentUser={this.setCurrentUser} />
          <RegisterArea setCurrentUser={this.setCurrentUser} />
          <Dashboard />
        </div>
      </React.Fragment>

    // I'M TRYING TO GET THE ROUTER WORKING! WILL COME BACK TO THIS BECAUSE IT IS CRUCIAL!
    // <Router>
    //   <div className='App'>
    //     <div className='Header'>
    //       <div className='quiz-head'>Quiz Rhubarb</div>
    //     </div>
    //     <main>
    //       <Route path='/login' render={() =>
    //           <LoginArea setCurrentUser={this.setCurrentUser} />}
    //       />

    //       <Route path='/register' render={() =>
    //         <Guard condition={!this.state.currentUser} redirectTo='/'>
    //           <RegisterArea setCurrentUser={this.setCurrentUser} />
    //         </Guard>}
    //       />

    //       <Route path='/quizzes' render={() =>
    //          <Dashboard currentUser={this.state.currentUser} logout={this.logout} />}
    //       />
    //     </main>
    //   </div>
    // </Router>
    )
  }
}

// const Guard = ({ redirectTo, condition, children }) => {
//   if (condition) {
//     return children
//   } else {
//     return <Redirect to={redirectTo} />
//   }
// }

export default App
