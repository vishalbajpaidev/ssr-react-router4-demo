'use strict';


require('dotenv').config();
import Main from './app/components'
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import assets from './assets';
import store from './app/store';
import React from 'react';
import routes from './config/route';

var ssr = require('ssr-react-router4');
const port = 3000;

const server = global.server = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }));
// server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('*', (req, res, next) => {
  const data = {
    title: 'SSR-React-router-v4-Demo',
    entry: assets.index.js,
    vendor: assets.vendor.js,
    stylesheet: assets.index.css,
    preloadedState: JSON.stringify({}),
    body: "",
  };
  const config = {
    App:Main,
    routes: routes,
    url: req.url,
    query: req.query,
    store: store,
  };
  const template = ejs.compile(require('./view/index.ejs.js'));

    ssr(config,(err,body)=>{
      if(err) console.log(err);
      // console.log(html);
      // console.log(JSON.stringify(store.getState()));
      data.body = body;
      data.preloadedState = JSON.stringify(store.getState());
      res.status(200);
      res.send(template(data));
    });



});


//
// Error handling
// -----------------------------------------------------------------------------
// 404 - when nothing handles this request (without error)
server.use((req, res) => {
  res.status(404);
  res.send('404');
});

// Other Server Errors
server.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  // logger.error(error);
  console.log(error);
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.send('500');
});


server.listen(port, () => {
  //logger.info(`The server is running at http://localhost:${port}/ in ${process.env.NODE_ENV} mode`);
  console.info(`The server is running at http://localhost:${port}/ in ${''} mode`);
});
