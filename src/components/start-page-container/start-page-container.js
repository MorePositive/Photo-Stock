import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page'
import SignUpPage from '../pages/sign-up-page/sign-up'

import './start-page-container.css'


const StartPageContainer = ({onSubmit, uiConfig, refreshApp, firebaseAuth, resetForm}) => {


  return (
    <div className="StartPageContainer">
    <Router> 
      <Switch>
        <Route path='/login'
        render={() => <LoginPage onSubmit={onSubmit} uiConfig={uiConfig} firebaseAuth={firebaseAuth} resetForm={resetForm} />} />
        <Route path='/signup'
        render={() => <SignUpPage refreshApp={refreshApp} resetForm={resetForm} />} />
      <Redirect to="/login"/>
      </Switch>
    </Router>
    </div>
  )
};

export default StartPageContainer;