import React from 'react';

import './send-form.css'

const SendForm = () => {

    return (
      <div className="container">
        <p className="send-form-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
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
        <form className="send-form">
          <div className="form-group">
            <label htmlFor="input_name">Name:</label>
            <input type="text" className="form-control" id="input_name" placeholder="Enter your name"/>
          </div>
          <div className="form-group">
            <label htmlFor="input-email">Email address:</label>
            <input type="email" className="form-control" id="input-email" placeholder="Enter your email"/>
          </div>
          <div className="form-group">
          <label htmlFor="text">Text:</label>
          <textarea type="text" className="form-control" id="text"/>
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    );
};

export default SendForm;