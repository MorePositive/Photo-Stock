import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../header/header'
import Carousel from '../slider/slider'
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import HomePage from '../pages/home-page/home-page'
import AboutPage from '../pages/about-page/about-page'
import SendForm from '../pages/send-form-page/send-form'
import GalleryPage from '../pages/gallery-page/gallery-page'
import GalleryCategory from '../pages/gallery-page/gallery-category-page'
import Contacts from '../pages/contacts-page/contacts'
import Account from '../pages/account-page/account'


const BaseContainer = ({ userdata, onLogout }) => {


  return (
    <Router>
      <Header data={userdata} onLogout={onLogout}/>
      <Carousel />
      <Breadcrumbs />
      <Switch>
        <Route exact path='/' render={() => <HomePage data={userdata} />} />
        <Route exact path='/about' render={() => <AboutPage />} />
        <Route exact path='/form' render={() => <SendForm />} />
        <Route exact path='/gallery' render={() => <GalleryPage data={userdata}/>} />
        <Route exact path='/gallery/:id' 
          render={({match}) => {
            const { id } = match.params;
            return <GalleryCategory itemId={id} data={userdata}/>
          }} 
        />
        <Route exact path='/contacts' render={() => <Contacts />} />
        <Route exact path='/account' render={() => <Account data={userdata}/>} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )
};

export default BaseContainer;