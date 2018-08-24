var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
},function (req, res) {
  var cache = [];
  res.send(JSON.stringify(req, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
          return;
      }
      cache.push(value);
    }
    return value;
  }));
});

module.exports = router;
