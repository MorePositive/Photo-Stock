import React from 'react';
import { Link } from 'react-router-dom';
import './home-page.css';

const HomePage = ({data}) => {

    return (
      <section className="container">
        <h2 className="greeting">Welcome to Photo-Stock! { data && (data.userName || data.displayName)} </h2>
        <p className="greeting">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Repellendus culpa quo molestiae voluptatibus quaerat aut maiores ducimus minus. Nostrum, 
        accusamus nisiodit beatae quisquam doloribus minus pariatur voluptates maxime aliquam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Repellendus culpa quo molestiae voluptatibus quaerat aut maiores ducimus minus. Nostrum, 
        accusamus nisiodit beatae quisquam doloribus minus pariatur voluptates maxime aliquam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Repellendus culpa quo molestiae voluptatibus quaerat aut maiores ducimus minus. Nostrum, 
        accusamus nisiodit beatae quisquam doloribus minus pariatur voluptates maxime aliquam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Repellendus culpa quo molestiae voluptatibus quaerat aut maiores ducimus minus. Nostrum, 
        accusamus nisiodit beatae quisquam doloribus minus pariatur voluptates maxime aliquam?
        </p>
        <Link to="/account" className="link-btn more-btn">Upload</Link>
      </section>
    );
};

export default HomePage;