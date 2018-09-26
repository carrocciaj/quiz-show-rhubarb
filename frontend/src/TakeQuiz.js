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
      selectedAnswers: {},
      score: ''
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
    // const answersArrayDup = this.state.selectedAnswers.slice()
    // this.setState({selectedAnswers: this.state.selectedAnswers.concat(event.target.value)})
    this.setState({
      selectedAnswers: Object.assign({}, this.state.selectedAnswers, {
        [event.target.name]: event.target.value
      })
    })
  }

  handleSubmit (quiz, answers) {
    const returnedAnswers = Object.values(answers)
    // console.log(Object.values(answers), this.state.quiz.data.id)
    data.submitAnswers(quiz, returnedAnswers).then(res => this.setState({ score: res }))
  }

  render () {
    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }

    const yourScore = this.state.score
    const quizData = this.state.quiz
    if (quizData.data) {
      return (
        <React.Fragment>
          {yourScore !== '' ? <p>You got {this.state.score} out of {Object.values(this.state.selectedAnswers).length}</p>

            : <div className='current-quiz'>
              <div className='quiz quiz-head'>{quizData.data.title}</div>
              <ol className='QandA-unit'>
                {/* {/* Not sure about the input fields event handlers - functions above - } */}
                { quizData.data.questions.map((question, idx) =>
                  <li key={idx}>
                    <div className='quiz-questions'>{question.text}</div>
                    <div className='quiz-answers'>
                      {question.answers.map((answer, idx) =>
                        <div key={idx}>
                          <div className='control'>
                            <input type='radio' id={answer.id}
                              name={question.id} value={answer.id} onChange={(e) => this.handleChange(e)} />
                            <label className='radio answers' htmlFor={answer.id}>{answer.text}</label>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                )}
              </ol>

              <button className='button is-primary score-submit' onClick={() => this.handleSubmit(this.state.quiz.data.id, this.state.selectedAnswers)}>Score me!</button>
            </div>
          }
        </React.Fragment>
      )
    } else {
      return (
        <p>Get ready...</p>
      )
    }
  }
}

export default TakeQuiz
