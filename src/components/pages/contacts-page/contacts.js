import React from 'react';

import './contacts.css';

const Contacts = () => {

  return (
    <section className="contact">
      <div className="contact-details">
      <h2>Contacts</h2>
      
      <p>feel free to contact us</p>
      <ul>
        <li><strong className="contact-label">Office:</strong> 21000, Vinnitsya, Voiniv-Internatsionalistiv Street</li>
        <li><strong className="contact-label">Email:</strong><a className="contact-link link" href="mailto:morepositivecode@gmail.com" target="_blank" rel="noopener noreferrer">morepositivecode@gmail.com</a></li>
        <li><strong className="contact-label">Skype:</strong><a className="contact-link link" href="skype:esthetical1?call">esthetical1</a></li>
        <li><strong className="contact-label">Tel:</strong><a className="contact-link link" href="tel:+38068111303*">+38068111303*</a></li>
      </ul>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d731.0993822657232!2d28.40783362135478!3d49.23200526292878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1597048136844!5m2!1sru!2sua" 
      title="Find us here"
      width="600" 
      height="450" 
      frameBorder="0" 
      style={{border: '0'}} 
      allowFullScreen="" 
      aria-hidden="false" 
      tabIndex="0">
        
      </iframe>
    </section>
  )
}

export default Contacts;