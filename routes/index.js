var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    data: `请求成功！`
  });
});

router.get('/list', function(req, res, next) {
  res.json({
    status: 200,
    data: `请求成功！`
  });
});


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.json({
    status: 200,
    data: 'users'
  })
  next();
});

module.exports = router;
