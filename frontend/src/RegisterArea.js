import React from 'react'
// import { ... } from 'react-router-dom'
// import data from './data'
import PropTypes from 'prop-types'
import 'bulma/css/bulma.css'
import './App.css'

class RegisterArea extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMsg: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { username, password, passwordConfirmation } = this.state
    if (password === password) {
      data.register(username, password)
      .then(user = this.props.setCurrentUser(user))
      .catch(err => {
        this.setState({
          errorMessage: err.message
        })
      })
    } else {
      this.setState({ errorMsg: 'Your password confirmation must match your password.'})
    }
  }

  render () {
    const { username, password, passwordConfirmation, errorMessage } = this.state
    
    return (
      <React.Fragment>
      <div className='login-view'>
        <div className='main-heads'>Log in</div>
        <form>
          <div className='field'>
            <label className='label'>Username</label>
            <div className='control'>
              <input className='input' type='text' placeholder='username' value={username} onChange={(e) => this.setState({ username: e.target.value })} />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input className='input' type='password' placeholder='password' value={password} onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
            <button type='submit'>Login</button>
            <div>
              <p> Don't have an account? </p>
              <button>Register for an account</button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
    )
  }