import React from 'react'
// import PropTypes from 'prop-types'
import { BrowserRouter as Redirect, Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import './App.css'

import data from './data'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quizzes: []
    }
    this.listQuizzes = this.listQuizzes.bind(this)
  }

  componentDidMount () {
    this.listQuizzes()
  }

  listQuizzes () {
    const { currentUser } = this.props
    if (currentUser && currentUser.token) {
      data.setUserToken(currentUser.token)
      data.getQuizzes().then(quizzes => this.setState({
        quizzes
      }))
    }
  }

  render () {
    const { quizzes } = this.state
    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }

    return (
      <React.Fragment>
        <div className='top-nav'>
          <div className='welcome-user-top'><span className='top-welcome'>Welcome back, {this.props.currentUser.username}</span></div>
          <button className='button is-primary logout-button' onClick={this.props.logout}>log out</button>
        </div>
        <div className='dashboard-view'>
          <div className='quiz-list'>
            <div className='main-heads'>Take a quiz!
            </div>
            <div className='published-quizzes'>
              {/* {this.state.quizzes.map(quiz =>
                <div key={quiz.quiz.id} title={quiz.quiz.title}>{quiz.quiz.title}</div>)} */}
              {quizzes.map(quiz => (
                <div className='available-quiz' key={quiz.id}><Link to={'/quiz/' + quiz.id}>{quiz.title}</Link></div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
