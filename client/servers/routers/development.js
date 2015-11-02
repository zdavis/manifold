const express = require('express');
const router = express.Router();

//import store from '../../src/reader/store/store.js';
//import Root from 'reader/components/Root';
//import React from 'react';
//import ReactDOM from 'react-dom';

// Declare our application routes.
router.get('/reader*', function(req, res, next) {
  req.url = '/static/reader.html';
  //out = ReactDOM.renderToString(<Root store={store} />);
  //console.log(out);
  //
  next();
});

router.get('/backend*', function(req, res, next) {
  req.url = '/static/backend.html';
  next();
});

router.get('/library*', function(req, res, next) {
  req.url = '/static/frontend.html';
  next();
});

module.exports = router;

