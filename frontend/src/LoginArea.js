import React from 'react'

import { Link } from 'react-router-dom'
import data from './data'
// import QuizBoard from './QuizBoard'
// import PropTypes from 'prop-types'

import 'bulma/css/bulma.css'
import './App.css'

class LoginArea extends React.Component {
  constructor (props) {
    super()
    this.state = {
      username: '',
      password: '',
      errorMessage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state.username, 'username')
    const { username, password } = this.state
    data.login(username, password)
      .then(user => this.props.setCurrentUser(user))
      .catch(err => {
        this.setState({
          errorMessage: err.errorMessage
        })
      })
  }

  render () {
    return (
      <React.Fragment>
        {/* <QuizBoard> */}
        <div className='login-view'>
          <div className='main-heads'>Log in</div>
          <form>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control'>
                <input className='input' type='text' placeholder='username' onChange={(e) => this.setState({ username: e.target.value })} />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input className='input' type='password' placeholder='password' onChange={(e) => this.setState({ password: e.target.value })} />
              </div>
            </div>
            <button className='button is-primary login-submit' type='submit' onClick={(e) => this.handleSubmit(e)}>Login</button>
            <div className='registration-option'>
              <p className='registration-question'>Don't have an account?</p>
              <Link to='/register'><button className='button is-primary register-link'>Register</button></Link>
            </div>
          </form>
        </div>
        {/* </QuizBoard> */}
      </React.Fragment>
    )
  }
}

// LoginArea.propTypes = {
//   setCurrentUser: PropTypes.func.isRequired
// }
export default LoginArea
