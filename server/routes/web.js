var express = require('express');
var router = express.Router();
var path = require('path')

// do not modify
router.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

module.exports = router;
