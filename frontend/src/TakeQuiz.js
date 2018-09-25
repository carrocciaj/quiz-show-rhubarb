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
  }

  componentDidMount () {
    this.populateQuiz()
  }

  // populateQuiz () {
  //   data.getQuiz(this.props.id)
  //     .then(quiz => this.setState({
  //       title: quiz.data.title,
  //       questions: quiz.data.questions
  //     }))
  // }

  populateQuiz () {
    data.getQuiz(this.props.id).then(quiz => this.setState({
      quiz
    }))
  }

  // handleSubmit () {
  //   data.submitAnswers
  // }

  render () {
    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }
    const quizData = this.state.quiz
    if (quizData.data) {
      return (
        <div>
          <ol>
            {/* add onclick(updateAnswers) to radio inputs ... not correct syntax! */}
            { quizData.data.questions.map((question, idx) =>
              <li key={idx}>
                {question.text}
                {question.answers.map((answer, idx) =>
                  <div key={idx}>
                    <input type='radio' id={answer.id}
                      name={question.id} value={answer.id} />
                    <label htmlFor={answer.id}>{answer.text}</label>
                  </div>
                )}
              </li>
            )}
          </ol>
          <button className='button is-primary score-submit' type='submit'>Score me!</button>
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
