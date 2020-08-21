import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import './login-page.css'
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = props.onSubmit;
    this.onLogin = this.onLogin.bind(this);
    this.resetForm = props.resetForm.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

	checkDublicate = () => {
		const { email, users } = this.state;
		for (let user of users) {
			if (email === user.email) {
				alert('email already exist');
				return false
			}
		}
		return true
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  onLogin(e) {
    this.onSubmit(e, this.state.email, this.state.password);
    this.resetForm();
  }

  render() {

    return (
      <div className="login-container">
        <form className="login-form">
          <div>
            <label htmlFor="login-email" className="label">E-mail:</label>
            <input value={this.state.email} onChange={this.handleChange} name="email" type="email" className="input email" id="login-email" placeholder="Enter email" autoComplete="on" />
          </div>
          <div>
            <label htmlFor="login-password" className="label">Password:</label>
            <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className="input password" id="login-password" placeholder="Password" autoComplete="current-password" />
          </div>
          <button
          onClick={this.onLogin}
          type="submit" 
          className="btn login-btn"
          >
            Sign in
          </button>
          <Link to='/signup' 
          className="link-btn"
          >
            <span className="link-text">
              Sign up
            </span>
          </Link>
          <StyledFirebaseAuth uiConfig={this.props.uiConfig} firebaseAuth={this.props.firebaseAuth} />
        </form>
      </div>
    );
  }
};