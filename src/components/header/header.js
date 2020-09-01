import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './header.css';
import Dropdown from './dropdown';

export default class Header extends Component {

  state = {
    click: false,
    dropdown: false
  }

  handleClick = () => {
    this.setState((prev) => ({click: !prev.click}))
  }

  closeMobileMenu = () => {
    this.setState({click: false})
  }

  onDropdownShow = () => {
    if (window.innerWidth < 960) {
      this.setState({dropdown: false})
    } else {
      this.setState({dropdown: true})
    }
  };

  onDropdownHide = () => {
    if (window.innerWidth < 960) {
      this.setState({dropdown: false})
    } else {
      this.setState({dropdown: false})
    }
  };

 render() {

  const { click, dropdown } = this.state
  const {data, onLogout} = this.props;

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={this.closeMobileMenu}>
          Photo-Stock
          <i className="fas fa-arrow-alt-circle-down"></i>
        </Link>
        <div className='menu-icon' onClick={this.handleClick}>
        <i className="fas fa-arrow-alt-circle-down"></i>
        <FontAwesomeIcon icon={click ? faTimes : faBars}/>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/about' className='nav-links' onClick={this.closeMobileMenu}>
              About
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/account'
              className='nav-links'
              onClick={this.closeMobileMenu}
            >
              Account
            </Link>
          </li>
          <li
            className='nav-item'
            onClick={this.onDropdownShow}
            onMouseLeave={this.onDropdownHide}
          >
            <Link
              to='/gallery'
              className='nav-links'
              onClick={this.closeMobileMenu}
            >
              Gallery
              <FontAwesomeIcon icon={faCaretDown}/>
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/contacts'
              className='nav-links'
              onClick={this.closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className="nav-item user-details">
          { data && data.photoURL ? 
          <div className="user-photo">
            <img className="user-pic" src={data.photoURL} alt="avatar" />
          </div> 
          : null}
          <button 
            className="btn nav-button"
            onClick={onLogout}
          >
            Logout
          </button>
            
          </li>
        </ul>
      </nav>
    </>
  );
 } 
}