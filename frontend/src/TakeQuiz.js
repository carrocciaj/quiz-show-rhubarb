import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Redirect } from 'react-router-dom'
import data from './data'

class TakeQuiz extends Component {
  constructor (props) {
    super()
    this.state = {
      quiz: {},
      selectedAnswers: []
      // quiz_id: this.props.id
    }
    this.populateQuiz = this.populateQuiz.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.populateQuiz()
  }

  populateQuiz () {
    data.getQuiz(this.props.id).then(quiz => this.setState({
      quiz
    }))
  }

  handleChange (event) {
    // const quizData = this.state.quiz
    const gatheredAnswers = this.state.selectedAnswers.push(event.target.value)
    this.setState(gatheredAnswers)
  }

  render () {
    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }

    handleSubmit (event) {
      event.preventDefault()
      //call the submitAnswers function/API call from .data file? Not sure how.
      submitAnswers
    }

    const quizData = this.state.quiz
    if (quizData.data) {
      return (
        <div>
          <ol>
            {/* {/* Not sure about the input fields event handlers - functions above - } */}
            { quizData.data.questions.map((question, idx) =>
              <li key={idx}>
                {question.text}
                {question.answers.map((answer, idx) =>
                  <div key={idx}>
                    <input type='radio' id={answer.id}
                      name={question.id} value={answer.id} checked={quizData.answer} onChange={this.handleChange} />
                    <label htmlFor={answer.id}>{answer.text}</label>
                  </div>
                )}
              </li>
            )}
          </ol>
          <button className='button is-primary score-submit' type='submit' onClick={ handleSubmit(e) }>Score me!</button>
        </div>
      )
    } else {
      return (
        <p>Get ready...</p>
      )
    }
  }
}

export default TakeQuiz
