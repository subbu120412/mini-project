import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './login.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    isInvalidLogin: false,
    errorMsg: '',
  }

  usernameChange = event => {
    this.setState({usernameInput: event.target.value})
  }

  passwordChange = event => {
    this.setState({passwordInput: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isInvalidLogin: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {usernameInput, passwordInput, isInvalidLogin, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          className="login-image"
          src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654003705/lg-login-img_kqzn5d.png"
          alt="website login"
        />
        <div className="form-container">
          <div className="login-logo-container">
            <img
              className="login-logo"
              src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654013491/Frame_274_ocsqvm.png"
              alt="website logo"
            />
            <h1 className="tasty-kitchen">Tasty Kitchens</h1>
          </div>
          <h1 className="login-heading">Login</h1>
          <form onSubmit={this.submitForm} className="form">
            <div className="input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                id="username"
                onChange={this.usernameChange}
                value={usernameInput}
                placeholder="Username"
                className="input"
                type="text"
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                onChange={this.passwordChange}
                value={passwordInput}
                placeholder="Password"
                className="input"
                type="password"
              />
            </div>
            <button
              onClick={this.submitForm}
              className="login-button"
              type="submit"
            >
              Login
            </button>
            {isInvalidLogin && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
