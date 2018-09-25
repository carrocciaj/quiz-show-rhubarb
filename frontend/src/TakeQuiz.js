import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Redirect } from 'react-router-dom'
import data from './data'

class TakeQuiz extends Component {
  constructor (props) {
    super()
    this.state = {
      quiz: {}
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

  render () {
    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }
    return (
      <React.Fragment>
        <ol>
          <h1>Goodbye???</h1>
          {console.log(this.state.quiz.data)}
          {this.state.quiz.data.map((question, idx) =>
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
      </React.Fragment>
    )
  }
}

export default TakeQuiz
