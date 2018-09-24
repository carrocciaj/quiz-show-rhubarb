import React from 'react'
// import PropTypes from 'prop-types'
import 'bulma/css/bulma.css'
import './App.css'

import data from './data'

class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      quizzes: []
    }
    // this.XX = this.XX.bind(this)
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
    let { quiz } = this.props
    return (
      <React.Fragment>
        <div className='dashboard-view'>
          <div className='top-nav'>
            <button className='button is-primary logout-button' onClick={this.props.logout} >log out</button>
            <div className='logout-bar button'>logout</div>/>
          </div>
          <div className='main-heads'>Take a quiz!</div>
          <div className='published-quizzes'>
          this.state.quizzes.map(quiz =>
            <quiz key={quiz.id} title={quiz.title} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
