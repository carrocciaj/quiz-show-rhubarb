import request from 'superagent'

let userToken
const apiDomain = process.env.REACT_APP_API_DOMAIN
// const apiDomain = REACT_APP_API_DOMAIN=https://rhubarb-quiz.herokuapp.com/

const data = {
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
  } 

  getUserToken 

}
export default data