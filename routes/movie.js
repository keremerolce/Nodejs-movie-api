var express = require('express');
var router = express.Router();

//models

const Movie=require('../models/Movie');
router.get('/',(req,res)=>{
  const promise=Movie.find({});
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});
router.get('/:movie_id',(req,res,next)=>{
  const promise=Movie.findById(req.params.movie_id);

  promise.then((movie)=>{
    if(!movie){
      next('The movie was not found');
    }
    res.json(movie);
  }).catch((err)=>{
    res.json(err);
  })
  //res.send(req.params);
});

/* GET users listing. */
router.post('/', function(req, res, next) {
 // const {title,imdb_score,category,country,year}=req.body;
  const movie=new Movie(/*{
  /*  title:title,
    imdb_score:imdb_score,
    category:category,
    country:country,
    year:year
  }*/ req.body);
 /* movie.save((err,data)=>{
    if(err){
      res.json(err);
    }
    res.json(data);
  });*/
  const promise=movie.save();
  promise.then((data)=>{
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  })
});

module.exports = router;
