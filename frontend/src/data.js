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
      .then(res => res.body.api_token)
      .then(token => {
        data.setUserToken(token)
        return { username, token }
      })

    // .catch(err) => {
    //   if (err.response.statusCode
    //   Come back to this !!
    // }
  },
  register: (username, password) => {
    return request.post(`${apiDomain}/api/users`)
      .send({ username, password })
      .then(res => res.body)
      .then(user => {
        data.setUserToken(user.token)
        return user
      })
    // .catch(err) => {
    //   if (err.response.statusCode
    //   Come back to this !!
    // }
  }
  // getUserToken
}
export default data
