import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import DatePicker from "react-datepicker";
import axiosData from '../../../service/axiosData';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import "react-datepicker/dist/react-datepicker.css";
import './sign-up.css'


export default class SignUpPage extends Component {

	constructor(props) {
		super(props)
		this.refreshApp = props.refreshApp;
		
		this.state = {
			users: [],
			userName: '',
			surName: '',
			email: '',
			phone: '',
			password: '',
			passwordConfirm: '',
			birthday: '',
			inputValidError: {
				userNameError: '',
				surNameError: '',
				emailError: '',
				passwordError: '',
				passwordConfirmError: '',
				birthdayError: '',
			},
			passwordShown: false,
			confirmShown: false,
			isRedirect: false
		}
	}

	componentDidMount() {
		this.updateUsers()
	}

	updateUsers = () => {
		axiosData.get('/users.json')
    .then(res => {
      const fetchedUsers = [];
      for (let key in res.data) {
        fetchedUsers.push({
          ...res.data[key],
          id: key
        })
			}
      this.setState({
        users: fetchedUsers
			})
    })
    .catch(err => console.log(err)); 
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

	postUsersDataHandler = (e) => {
		const { userName, surName, email, phone, password, birthday, passwordConfirm} = this.state;
		e.preventDefault();
		const isValid = this.validate();
		const confirmed = passwordConfirm === password;

		if (isValid && confirmed) {
			const usersData = {
				userName,
				surName,
				email,
				phone,
				password,
				birthday
			}
			axiosData.post('/users.json', usersData)
				.then(res => {
					this.setState({ isRedirect: true });
					this.refreshApp();
					alert('Thanks for registation!');
				})
				.catch(err => console.log(err))
		}		
	}

	validate = () => {
		const {userName, surName, email, password, passwordConfirm, birthday } = this.state;
		let userNameError = '';
		let surNameError = '';
		let emailError = '';
		let passwordError = '';
		let passwordConfirmError = '';
		let birthdayError = '';

		const validEmail = this.checkDublicate();

		if (!userName) {
		userNameError = "name is empty";
		} 

		if (!surName) {
			surNameError = "surname is empty";
		}

		if (!email) {
			emailError = "email field is empty";
		} else if (!validEmail) {
			emailError = "email already registered";
		}

		if (!password) {
			passwordError = "password field is empty";
		}

		if (!passwordConfirm) {
			passwordConfirmError = "confirm your password";
		} else if (passwordConfirm !== password) {
			passwordConfirmError = "incorrect password";
		}

		if (!birthday) {
			birthdayError = "birthday field is empty";
		}

		if (!validEmail || userNameError || surNameError || emailError || passwordError || passwordConfirmError || birthdayError) {
			this.setState({
				inputValidError: {
					userNameError, 
					surNameError,
					emailError,
					passwordError,
					passwordConfirmError,
					birthdayError,
				} 
			})
			return false
		}
		return true
	}

	togglePasswordVisibility = () => {
		const {passwordShown} = this.state;
		this.setState({
			passwordShown: !passwordShown,
		})
	}
	togglePasswordConfirmVisibility = () => {
		const {confirmShown} = this.state;
		this.setState({
			confirmShown: !confirmShown
		})
	}

	handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

	render() {

		const { passwordShown, confirmShown, isRedirect } = this.state;

		if (isRedirect) {
			return <Redirect to="/login"/>
		}

		return (
      <div className="login-container signup-container">			
       <form className="signup-form" onSubmit={this.postUsersDataHandler} >
			 	<h2 className="heading">Add new user</h2>
				<div className="form-group">
					<div className="form-wrapper">
						<label htmlFor="role" className="label">Username<span className="required">*</span></label>
						<input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} />
						<div className="validation-error">{this.state.inputValidError.userNameError}</div>
					</div>
					<div className="form-wrapper">
						<label htmlFor="lastname" className="label">Surname<span className="required">*</span></label>
						<input type="text" name="surName" value={this.state.surName} onChange={this.handleChange} />
						<div  className="validation-error">{this.state.inputValidError.surNameError}</div>
					</div>
				</div>
				<div className="form-wrapper">
					<label htmlFor="email" className="label">Email address<span className="required">*</span></label>
					<input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
					<div  className="validation-error">{this.state.inputValidError.emailError}</div>
				</div>
				<div className="form-group">
				<div className="form-wrapper">
					<div className="password-container">
					<label htmlFor="password" className="label">Password<span className="required">*</span></label>
					<input type={passwordShown ? "text" : "password"} name="password" value={this.state.password} onChange={this.handleChange} />
					<FontAwesomeIcon className="eye" icon={faEye} onClick={this.togglePasswordVisibility}/>
					</div>
					<div className="validation-error">{this.state.inputValidError.passwordError}</div>
				</div>
				<div className="form-wrapper">
					<div className="password-container">
					<label htmlFor="passwordConfirm" className="label">Password Confirm<span className="required">*</span></label>
					<input type={confirmShown ? "text" : "password"} name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} />
					<FontAwesomeIcon className="eye" icon={faEye} onClick={this.togglePasswordConfirmVisibility}/>
					</div>
					<div className="validation-error">{this.state.inputValidError.passwordConfirmError}</div>
				</div>
				</div>
				<div className="form-group">
				<div className="form-wrapper">
					<label htmlFor="phone" className="label">Phone</label>
					<input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} />
				</div>
				<div className="form-wrapper">
				<label className="label">Birthday<span className="required">*</span></label>
				<DatePicker
					selected={this.state.birthday}
					onChange={(date) => this.setState({birthday: date})}
				/>
				<div className="validation-error">{this.state.inputValidError.birthdayError}</div>
				</div>
				</div>
				<button className="btn create-acc-btn">Create new</button>
				<Link to="/login" className="link-btn signup-btn" >Exit</Link>
			</form>
		</div>
    );
	}
}