const express = require('express');
const router = express.Router();
const path = require('path');

// Declare our application routes.
router.get('/reader*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/static/reader.html'));
});

router.get('/backend*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/static/backend.html'));
});

router.get('/library*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/static/frontend.html'));
});

// TODO: Is it safe to proxy the static URL like this? Path traversal vulnerability?
router.get('/static*', function(req, res, next) {
  res.sendFile(path.join(__dirname, `../../dist${req.url}`));
});

module.exports = router;

