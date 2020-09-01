import React, { Component } from 'react';
import Cookies from 'js-cookie'

import axiosData from '../../service/axiosData'
import { fire, uiConfig } from '../../service/fire'

import './app.css';

import StartPageContainer from '../start-page-container/start-page-container'
import BaseContainer from '../base-container/base-container'


export default class App extends Component {



  state = {
    isLoggedIn: false,
    currentUser: null
  }

  refreshApp(checkUser) {
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
        if (checkUser) {
          if (Cookies.get('isLoggedIn')) {
            const userEmail = Cookies.get('currentUser');
            for (let i = 0; i < this.state.users.length; i++) {
              if (userEmail === this.state.users[i].email) {
                const user = this.state.users[i];
                this.setState({
                  isLoggedIn: true,
                  currentUser: user,
                })
                sessionStorage.setItem('user', JSON.stringify(user))
                break;
              }
            }
          }
          else {
            Cookies.remove('isLoggedIn');
            Cookies.remove('currentUser');
          }
        }
      })
      .catch(err => console.log(err)); 
  }

  componentDidMount() {  
    const cachedUser = JSON.parse(sessionStorage.getItem('user'));
    if (Cookies.get('isLoggedIn') && cachedUser) {
      this.setState({ 
        isLoggedIn: true,
        currentUser: cachedUser
      })
    } else {
      this.refreshApp(true);
    }
    fire.onAuthStateChanged( user => {
      if (user) {
        this.setState({
          isLoggedIn: !!user,
          currentUser: user
        })
          Cookies.set('isLoggedIn', true, {expires: 365});
          Cookies.set('currentUser', user.email);
      }
    });
  }

  onLogin(e, email, password) {
    e.preventDefault();
    if (this.state.users) {
      for ( let user of this.state.users  ) {
        if (email === user.email && password === user.password) {
          this.setState({
            isLoggedIn: true,
            currentUser: user
          })
          sessionStorage.setItem('user', JSON.stringify(user))
          Cookies.set('isLoggedIn', true, {expires: 365});
          Cookies.set('currentUser', user.email);
          return;
        }
      } 
    }
    alert('Please, enter correct username and password');
  }

  onLogout = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
      currentUser: null
    });
    sessionStorage.removeItem('user');
    Cookies.remove('isLoggedIn');
    Cookies.remove('currentUser');
    fire.signOut();
    this.refreshApp(true);
  }

  resetForm() {
		this.setState({
			userName: '',
			surName: '',
			email: '',
			phone: '',
      password: '',
      passwordConfirm: '',
      birthday: ''
		})
	}

  render() {

    const {isLoggedIn} = this.state;

    return isLoggedIn ? 
    <BaseContainer userdata={this.state.currentUser} onLogout={this.onLogout.bind(this)} /> : 
    <StartPageContainer onSubmit={this.onLogin.bind(this)} uiConfig={uiConfig} refreshApp={this.refreshApp.bind(this)} firebaseAuth={fire} resetForm={this.resetForm} /> 
  };
};