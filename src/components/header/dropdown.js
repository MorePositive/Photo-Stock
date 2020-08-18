import React, { Component } from 'react';
import { MenuItems } from './menu-items';
import './dropdown.css';
import { Link } from 'react-router-dom';

export default class Dropdown extends Component {

    state = {
      click: false
    }


  onToggleHandler = () => {
    this.setState((prev) => ({click: !prev.click}))
  }
  

  render() {
    return (
      <>
        <ul
          onClick={this.onToggleHandler}
          className={this.state.click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={item.cName}
                  to={item.path}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }  
}