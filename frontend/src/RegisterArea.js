import React from 'react'
import { BrowserRouter as Redirect } from 'react-router-dom'
import data from './data'
// import QuizBoard from './QuizBoard'
// import PropTypes from 'prop-types'
import 'bulma/css/bulma.css'
import './App.css'

class RegisterArea extends React.Component {
  constructor (props) {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const { username, password, passwordConfirmation } = this.state
    if (password === passwordConfirmation) {
      data.users(username, password)
        .then(user => this.props.setCurrentUser(user))
        .catch(err => {
          this.setState({
            errorMessage: err.message
          })
        })
    } else {
      this.setState({ errorMessage: 'Your password confirmation must match your password.' })
    }
  }

  render () {
    const { username, password, passwordConfirmation, errorMessage } = this.state

    return (
      <React.Fragment>
        <div className='registration-view'>
          <div className='main-heads'>Register</div>
          <form onSubmit={this.handleSubmit}>
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
            </div>
            <div className='field'>
              <label className='label'>Confirm password</label>
              <div className='control'>
                <input className='input' type='password' placeholder='Retype password' value={passwordConfirmation} onChange={(e) => this.setState({ passwordConfirmation: e.target.value })} />
              </div>
            </div>
            <button className='button is-primary register-submit' type='submit' >Register</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

// RegisterArea.propTypes = {
//   setCurrentUser: PropTypes.func.isRequired
// }
export default RegisterArea
