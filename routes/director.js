var express = require('express');
var router = express.Router();


//Models
const Director=require('..//models/Director');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
