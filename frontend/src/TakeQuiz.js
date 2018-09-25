import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import data from './data'

class TakeQuiz extends Component {
  constructor (props) {
    super()
    this.state = {
      title: '',
      questions: []
    }
  }

  componentDidMount () {
    this.populateQuiz()
  }

  populateQuiz () {
    data.getQuiz(this.props.id)
      .then(quiz => this.setState({
        title: quiz.data.title,
        questions: quiz.data.questions
      }))
  }

  render () {
    return (
      <React.fragment>
        <ol>
          {this.state.questions.map((question, idx) =>
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
      </React.fragment>
    )
  }
}

export default TakeQuiz
