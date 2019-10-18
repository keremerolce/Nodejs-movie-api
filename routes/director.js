var express = require('express');
var router = express.Router();


//Models
const Director=require('..//models/Director');
/* GET home page. */
router.get('/', function(req, res, next) {
  const director=new Director(req.body);
  const promise=director.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(data);
  });
});

module.exports = router;
