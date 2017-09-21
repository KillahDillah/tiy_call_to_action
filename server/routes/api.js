var express = require('express');
var router = express.Router();

/* /api starting endpoint */
router.get('/foo', function(req, res, next) {
  res.json({
    foo: 'bar'
  })
});

module.exports = router;
