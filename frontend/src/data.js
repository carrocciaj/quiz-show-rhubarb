import request from 'superagent'

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
      .then(res => res.body.token)
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
  },

  users: (username, password) => {
    return request.post(`${apiDomain}/api/users`)
      .send({ username, password })
      .then(res => res.body)
      .then(user => {
        data.setUserToken(user.token)
        return user
      })

      .catch(err => {
        if (err.response.statusCode === 422) {
          const errors = err.response.body.errors
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
  },

  getQuizzes: () => {
    return request.get(`${apiDomain}/api/quizzes`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        let quizzes = res.body
        return (quizzes)
      })
  }

  getQuiz: () => { 
    return request.get(`${apiDomain}/api/quizzes/${id}`)
    .set('Authorization', `Bearer ${userToken}`)
    .then(res => res.body)
  }
  // getUserToken
}
export default data
