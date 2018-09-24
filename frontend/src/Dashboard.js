import React from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import './App.css'

import data from './data'

class Dashboard extends React.Component {
  constructor () {
    super()
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
    const quiz = this.props.quizzes
    return (
      <React.Fragment>
        <div className='top-nav'>
          <div className='welcome-user-top'><span className='top-welcome'>Welcome back, ${this.props.username}</span></div>
          <button className='button is-primary logout-button' onClick={this.props.logout} >log out</button>
          <div className='logout-bar button'>logout</div>/>
        </div>
        <div className='dashboard-view'>
          <div className='quiz-list'>
            <div className='published-quizzes'>
              <div className='main-heads'>Take a quiz!</div>
          this.state.quizzes.map(quiz =>
              <this.state.quizzes key={quiz.quiz.id} title={quiz.quiz.title} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
