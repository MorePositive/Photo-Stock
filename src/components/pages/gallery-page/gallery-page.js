import React from 'react';
import GalleryAll from './gallery-all'

import {withRouter} from 'react-router-dom'

import './gallery-page.css';

const GalleryPage = ({history, data}) => {

  return (
    <GalleryAll 
      data={data}
      onItemSelected={(e, row) => {
      const newPath = `gallery/${row.id}`;
      history.push(newPath);
    }}/>
  )
};

export default withRouter(GalleryPage);