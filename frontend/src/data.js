import request from 'superagent/superagent.js'

let userToken
const apiDomain = process.env.REACT_APP_API_DOMAIN
// const apiDomain = REACT_APP_API_DOMAIN=https://rhubarb-quiz.herokuapp.com

const data = {
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
  },
  login: (username, password) => {
    return request.post(`${apiDomain}/api/login`)
      .send({ username, password })
      .then(res => res.body.api_token)
      .then(token => {
        data.setUserToken(token)
        return { username, token }
      })

      .catch(err => {
        if (err.response.statusCode === 422) {
          throw new Error('You must provide a username and password.')
        } else if (err.response.statusCode === 401) {
          throw new Error('There is no registered user matching that username and password.')
        } else {
          throw new Error('There was a problem communicating with the server.')
        }
      })
    // Wrap error message in bulma notification stying:
    // <div class="notification is-warning">
    // <button class="delete"></button> </div>
  },

  users: (username, password) => {
    return request.post(`${apiDomain}/api/users`)
      .send({ username, password })
      .then(res => res.body.api_token)
      .then(token => {
        data.setUserToken(token)
        return { username, token }
      })

      .catch(err => {
        if (err.response.statusCode === 422) {
          const errors = err.response.body.errors
          // This part below [0] is causing an error.
          if (errors[0].message === 'cannot be empty') {
            throw new Error('You must provide a username and password.')
          } else if (errors[0] === 'user already exists') {
            throw new Error('A user with that username already exists.')
          } else {
            throw new Error(`An unknown problem occurred: ${errors}`)
          }
        } else {
          throw new Error('There was a problem communicating with the server.')
        }
      })
    // Wrap error message in bulma notification stying:
    // <div class="notification is-warning">
    // <button class="delete"></button> </div>
  },

  // updated this with the /quiz.id added to endpoints doc
  getQuizzes: () => {
    return request.get(`${apiDomain}/api/quizzes`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        let quizzes = res.body
        return (quizzes)
      })
  },

  getQuiz: (id) => {
    return request.get(`${apiDomain}/api/quizzes/${id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        let quiz = res.body
        return (quiz)
      })
  },

  submitAnswers: (quiz_id, answer_id) => {
    return request.post(`${apiDomain}/api/scores`)
      .send({ quiz_id, answer_id })
      .then(res => {
        let quizScore = res.body.data.score.score
        return { quizScore }
      })

  }
}
export default data
