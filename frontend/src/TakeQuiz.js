import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Redirect } from 'react-router-dom'
import data from './data'
import { callbackify } from 'util'

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
    // this.handleSubmit = this.handleSubmit.bind(this)
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

  // The below is throwing an error and needs to be fixed to make API call.

  // handleSubmit () {
  //   event.preventDefault()
  //   // call the submitAnswers function/API call from .data file? Not sure how.
  //   submitAnswers
  // }

  render () {
    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }

    const quizData = this.state.quiz
    if (quizData.data) {
      return (
        <div className='current-quiz'>
          <div className='quiz quiz-head'>{quizData.data.title}</div>
          <ol className='QandA-unit'>
            {/* {/* Not sure about the input fields event handlers - functions above - } */}
            { quizData.data.questions.map((question, idx) =>
              <li key={idx}>
                <div className='quiz-questions'>{question.text}</div>
                <div className='quiz-answers'>
                  {question.answers.map((answer, idx) =>
                    <div key={idx}>

                      {/* Code I had before, with attempted edit from Amy below  ... */}

                      {/* <input type='radio' id={answer.id}
                      name={question.id} value={answer.id} checked={quizData.answer} onChange={this.handleChange} /> */}
                      {/* Re: below. it wouldn't let me make checked={true} as done in that article and rec'd by Amy ... need to assign that something */}
                      <div class='control'>
                        <input type='radio' id={answer.id}
                          name={question.id} value={answer.id} checked='check' onChange={this.handleChange} />
                        <label className='radio answers' htmlFor={answer.id}>{answer.text}</label>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ol>

          <button className='button is-primary score-submit' type='submit' onClick={(e) => this.handleSubmit}>Score me!</button>
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
