import React from 'react';
import {Link} from 'react-router-dom'
import './pagination.css'

const Pagination = ({ imagesPerPage, totalImages, paginate, category }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <Link to={`/gallery/${category}`} onClick={() => paginate(number)} className='link-btn page-link'>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;