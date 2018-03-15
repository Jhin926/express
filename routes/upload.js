
var fs = require('fs');
var bodyParser = require('body-parser');

var express = require('express');
var router = express.Router();
router.use('/', function (req, res, next) {
  console.log(req.files);
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');

  var allowedHeaders = req.headers['access-control-request-headers'];
  if (allowedHeaders) {
    res.set('Access-Control-Allow-Headers', allowedHeaders);
  }
  next();
});
router.post('/', function (req, res, next) {
  console.log(req.files);
  next();
  // res.send('ymbymb');
},function(req,res){
  console.log(req.files[0]);
  var des_file = __dirname + '/' + req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: 'file uploaded successfully',
          filename: req.files[0].originalaname
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    })
  })
});


module.exports = router;
