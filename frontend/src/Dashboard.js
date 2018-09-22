import React from 'react'
import PropTypes from 'prop-types'
import 'bulma/css/bulma.css'
import './App.css'

class Dashboard extends React.Component {
    constructor (props) {
      super()
      this.state = {
        username: '',
        password: '',
        errorMessage: null
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
export default Dashboard 