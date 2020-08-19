var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
      status: 200,
      data: `请求成功！`
    });
  });

module.exports = router;
