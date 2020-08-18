import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';


const app = (
    <App />
)

ReactDOM.render(app, document.getElementById('root'));
