import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import DatePicker from "react-datepicker";
import axiosData from '../../../service/axiosData';

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
				userNameClazz: '',
				surNameError: '',
				surNameClazz: '',
				emailError: '',
				emailClazz: '',
				passwordError: '',
				passwordClazz: '',
				passwordConfirmError: '',
				passwordConfirmClazz: '',
				roleError: '',
				birthdayError: '',
				birthdayClazz: ''
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
		let userNameClazz = '';
		let surNameClazz = '';
		let emailClazz = '';
		let passwordClazz = '';
		let passwordConfirmClazz = '';
		let birthdayClazz = '';

		const validEmail = this.checkDublicate();

		if (!userName) {
		userNameError = "name is empty";
		userNameClazz = " is-invalid";
		} 

		if (!surName) {
			surNameError = "surname is empty";
			surNameClazz += " is-invalid";
		}

		if (!email) {
			emailError = "email field is empty";
			emailClazz += " is-invalid"
		} else if (!validEmail) {
			emailError = "email already registered";
			emailClazz += " is-invalid"
		}

		if (!password) {
			passwordError = "password field is empty";
			passwordClazz += " is-invalid";
		}

		if (!passwordConfirm) {
			passwordConfirmError = "confirm your password";
			passwordConfirmClazz += " is-invalid";
		} else if (passwordConfirm !== password) {
			passwordConfirmError = "incorrect password";
			passwordConfirmClazz += " is-invalid";
		}

		if (!birthday) {
			birthdayError = "birthday field is empty";
			birthdayClazz += " is-invalid";
		}

		if (!validEmail || userNameError || surNameError || emailError || passwordError || passwordConfirmError || birthdayError) {
			this.setState({
				inputValidError: {
					userNameError, 
					userNameClazz, 
					surNameError,
					surNameClazz, 
					emailError,
					emailClazz, 
					passwordError,
					passwordClazz,
					passwordConfirmError,
					passwordConfirmClazz,
					birthdayError,
					birthdayClazz 
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

		const { passwordShown, confirmShown, password, passwordConfirm, isRedirect } = this.state;

		const hideIcon = password ? "fa fa-eye password-icon" : "";
		const hideIconConfirm = passwordConfirm ? "fa fa-eye password-icon" : "";
		const errorStyle = {
			fontSize: 12,
			color: 'red'
		}
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
						<input type="text" className={this.state.inputValidError.userNameClazz} name="userName" value={this.state.userName} onChange={this.handleChange} />
						<div style={errorStyle} className="">{this.state.inputValidError.userNameError}</div>
					</div>
					<div className="form-wrapper">
						<label htmlFor="lastname" className="label">Surname<span className="required">*</span></label>
						<input type="text" className={this.state.inputValidError.surNameClazz} name="surName" value={this.state.surName} onChange={this.handleChange} />
						<div style={errorStyle}  className="">{this.state.inputValidError.surNameError}</div>
					</div>
				</div>
				<div className="form-wrapper">
					<label htmlFor="email" className="label">Email address<span className="required">*</span></label>
					<input type="email" className={this.state.inputValidError.emailClazz} name="email" value={this.state.email} onChange={this.handleChange} />
					<div style={errorStyle}  className="">{this.state.inputValidError.emailError}</div>
				</div>
				<div className="form-group">
				<div className="form-wrapper">
					<div className="password-container">
					<label htmlFor="password" className="label">Password<span className="required">*</span></label>
					<input type={passwordShown ? "text" : "password"} className={this.state.inputValidError.passwordClazz} name="password" value={this.state.password} onChange={this.handleChange} />
					<i className={hideIcon} onClick={this.togglePasswordVisibility}></i>
					</div>
					<div style={errorStyle} className="">{this.state.inputValidError.passwordError}</div>
				</div>
				<div className="form-wrapper">
					<div className="password-container">
					<label htmlFor="passwordConfirm" className="label">Password Confirm<span className="required">*</span></label>
					<input type={confirmShown ? "text" : "password"} className={this.state.inputValidError.passwordConfirmClazz} name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} />
					<i className={hideIconConfirm} onClick={this.togglePasswordConfirmVisibility}></i>
					</div>
					<div style={errorStyle} className="">{this.state.inputValidError.passwordConfirmError}</div>
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
				className={this.state.inputValidError.birthdayClazz}
				selected={this.state.birthday}
        onChange={(date) => this.setState({birthday: date})}
				/>
				<div style={errorStyle}  className="">{this.state.inputValidError.birthdayError}</div>
				</div>
				</div>
				<button className="btn create-acc-btn">Create new</button>
				<Link to="/login" className="link-btn signup-btn" >Exit</Link>
			</form>
		</div>
    );
	}
}