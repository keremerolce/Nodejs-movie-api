var express = require("express");
var router = express.Router();

//models

const Movie = require("../models/Movie");
router.get("/", (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup:{
        from:'directors',
        localField:'director_id',
        foreignField:'_id',
        as:'director'
      }
    },
    {
      $unwind:'$director'
    }
  ]);
  console.log(promise);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/top10", (req, res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score:-1});
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/:movie_id", (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise
    .then(movie => {
      if (!movie) {
        next({ message: "The movie was not found", code: 99 });
      }
      res.json(movie);
    })
    .catch(err => {
      res.json(err);
    });
  //res.send(req.params);
});
router.put("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
    );

  promise
    .then(movie => {
      if (!movie) {
        next({ message: "The movie was not found", code: 99 });
      }
      res.json(movie);
    })
    .catch(err => {
      res.json(err);
    });
  //res.send(req.params);
});
router.delete("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise
    .then(movie => {
      if (!movie) {
        next({ message: "The movie was not found", code: 99 });
      }
      res.json(movie);
    })
    .catch(err => {
      res.json(err);
    });
  //res.send(req.params);
});

/* GET users listing. */
router.post("/", function(req, res, next) {
  const movie = new Movie(req.body);
  movie.save((err,data)=>{
    if(err){
      res.json(err)
    }
    else{
      res.json(data);
    }
  });
 // const promise = movie.save();
/*  promise.then((data) => {
      res.json({status:1});
    }).catch((err) => {
      res.json(err);
    });*/
});
router.get("/between/:start_year/:end_year", (req, res) => {
  const {start_year,end_year} = req.params; 
  const promise = Movie.find(
    {
      year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
    });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
