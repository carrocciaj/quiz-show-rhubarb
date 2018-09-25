import React from 'react'
// import PropTypes from 'prop-types'
import { BrowserRouter as Redirect } from 'react-router-dom'
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
    if (currentUser && currentUser.api_token) {
      data.setUserToken(currentUser.api_token)
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
          <div className='welcome-user-top'><span className='top-welcome'>Welcome back, {this.props.username}</span></div>
          <button className='button is-primary logout-button' onClick={this.props.logout}>log out</button>
          <div className='logout-bar button'>logout</div>
        </div>
        <div className='dashboard-view'>
          <div className='quiz-list'>
            <div className='main-heads'>Take a quiz!
            </div>
            <div className='published-quizzes'>
              {/* {this.state.quizzes.map(quiz =>
                <div key={quiz.quiz.id} title={quiz.quiz.title}>{quiz.quiz.title}</div>)} */}
              {quizzes.map(quiz => (
                <div className='available-quiz' key={quizzes.id}>{quizzes.name}</div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
