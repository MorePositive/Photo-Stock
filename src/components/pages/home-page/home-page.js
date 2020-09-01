import React from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUpload, faCameraRetro, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './home-page.css';

const HomePage = ({data}) => {

    return (
      <section className="container">
        <h2 className="greeting">Welcome to Photo-Stock!<br/> { data && (data.userName || data.displayName)} </h2>
        <p className="greeting">
        Photo-Stock - Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Repellendus culpa quo molestiae voluptatibus quaerat aut maiores ducimus minus. Nostrum, 
        accusamus nisiodit beatae quisquam doloribus minus pariatur voluptates maxime aliquam? </p>
       <h3>Here you can:</h3>
        <ul className="greeting-list">
          <li className="greeting-list-item"><FontAwesomeIcon className="greeting-list-icon" icon={faUpload}/> Upload your photos </li>
          <li className="greeting-list-item"><FontAwesomeIcon className="greeting-list-icon" icon={faCameraRetro}/> View shared photos by other users</li>
          <li className="greeting-list-item"><FontAwesomeIcon className="greeting-list-icon" icon={faThumbsUp}/> Rate photos</li>
        </ul>
        <p className="greeting-subtext">Click the link below to share your photos with the world</p>
        <Link to="/account" className="link-btn more-btn">Upload</Link>
      </section>
    );
};

export default HomePage;