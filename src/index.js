import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './app';
import  store from './app/store';
import {Provider} from 'react-redux';

const app = document.querySelector('#app');

// Render main application
render(<Provider store={store}><App/></Provider>, app);

