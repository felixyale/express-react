var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'dist/uploads/' });

var request = require('../libs/request');
var cache = require('../libs/redisCache');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  // var sess = req.session;
  // if (!sess || !sess.userName) {
  //   res.json({
  //     code: -1,
  //     msg: '请登录',
  //     data: false
  //   });
  //   return;
  // }

  next();
});

router.post('/upload', upload.single('photos'), function (req, res, next) {
  console.log(req.file);
  res.json({
    success: true,
    path: req.file.path
  });
  // req.body contains the text fields
});

// data post
router.post('/:action', function(req, res, next) {
  var action = req.params.action;
  var body = req.body.data ? JSON.parse(req.body.data) : {};

  // var sess = req.session;
  // body.userName = sess.userName;

  request.post(action, body, function(data) {
    res.json(data);
  });
});

// data get
router.get('/:action', function(req, res, next) {
  var action = req.params.action;

  var body = req.query.data ? JSON.parse(req.query.data) : {};

  // var sess = req.session;
  // body.userName = sess.userName;

  request.get(action, body, function(data) {
    res.json(data);
  });
});


router.get('/mock/:action', function(req, res, next) {
  request.mock(req.params.action, function(data) {
    res.json(data);
  });
});

router.get('/cache/clear', function(req, res, next) {
  // like /m/shanghai
  var path = req.query.path;
  if (cache) {
    cache.del(path, function() {
      res.json({
        path: path,
        msg: '缓存删除完成'
      });
    });
  } else {
    res.json({
      path: path,
      msg: '没缓存，不需要清'
    });
  }
});

module.exports = router;
