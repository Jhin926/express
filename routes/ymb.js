var express = require('express');
var router = express.Router();
const request = require('request');

/* GET users listing. */
router.use('/', function (req, res, next) {
  // res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');

  var allowedHeaders = req.headers['access-control-request-headers'];
  if (allowedHeaders) {
    res.set('Access-Control-Allow-Headers', allowedHeaders);
  }
  next();
});
let yyy = {};
var options = {
  url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb055edabdbc3e271&redirect_uri=http%3A%2F%2Fwx.weidu.xin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
  method: "get"
};
request(options, function(err, res, data) {
  yyy = data;
});

router.get('/', function (req, res, next) {
  next();
  // res.send('ymbymb');
},function(req,res){
  setTimeout(() => {
    res.send(yyy);
  }, 1000)
});
router.get('/rhm', function (req,res) {
  console.log(req.socket.localAddress);
  console.log(req.socket.address());
  res.json({'00123': 'a'});
});
router.use('/rhm/:id', function (req,res,next) {
  console.log(req.originalUrl);
  next();
});
router.get('/rhm/:id', function(req,res,next){
  console.log(req.params.id);
  if(req.params.id === '0') next('route');
  else next();
},function(req,res){
  res.send('id不是0');
});
router.get('/rhm/:id', function(req,res,next){
  res.send('id是0');
});
router.post('/test', function (req, res, next) {
  console.log(req.socket.localAddress);
  console.log(req.socket.address());
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');

  var allowedHeaders = req.headers['access-control-request-headers'];
  if (allowedHeaders) {
    res.set('Access-Control-Allow-Headers', allowedHeaders);
  }
  console.log(req.cookies);
  res.send('test');
});
router.get('/test', function (req, res, next) {
  console.log(req.socket.localAddress);
  console.log(req.socket.address());
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');

  var allowedHeaders = req.headers['access-control-request-headers'];
  if (allowedHeaders) {
    res.set('Access-Control-Allow-Headers', allowedHeaders);
  }
  console.log(req.cookies);
  res.send('test');
});
router.get('/getcookies', function (req, res, next) {
  console.log(req.cookies);
  // res.clearCookie('ymb'); // 貌似没有用
  res.send('getcookies');
});
router.get('/getsession', function (req, res, next) {
  console.log(req.sessionID);
  res.send('getsession');
});
router.use('/jsonp', function (req, res, next) {
  next();
});
router.get('/jsonp', function (req, res, next) {
  let callback = req.query.jsoncallback;
  
  // 方法1（ 自定义回调函数名字）  
  /* let resStr = callback + '(' + JSON.stringify({ymb: 'ymb'}) + ')';
  res.send(resStr); */
  
  // 方法2（ 自定义回调函数名字）（app.js里面也要设置一下app.set('jsonp callback name', 'jsoncallback');）
  /* res.jsonp({ymb: 'ymb'}); */
  
  // 默认回调函数名字callback
  res.jsonp({ymb: 'ymb'});
});

// 415错误
router.post('/errorparam', function (req, res, next) {
  res.send('xxx');
});

module.exports = router;
