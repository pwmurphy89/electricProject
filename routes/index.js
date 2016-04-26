var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.	MONGOLAB_URI ||
			   process.env.MONGOHQ_URL ||
			   'mongodb://localhost:27017/electricProject';
var db;

MongoClient.connect(mongoUrl, function(error, database) {
	db = database;
	});

router.get('/', function(req, res, next) {
	var currIP = req.ip;
	console.log("The current user's IP address is " + currIP);
	db.collection('users').find({ip:currIP}).toArray(function(error, userResult){
		var photosVoted = [];
		for (var i =0; i < userResult.length;i++){
			photosVoted.push(userResult[i].image);
		}
		db.collection('cars').find({imageSrc: {$nin: photosVoted}}).toArray(function(error, photosToShow){
			if (photosToShow.length == 0){
				res.redirect('/standings');
			}else{
				var randomNum = Math.floor(Math.random() * photosToShow.length);
				res.render('index', { carImage:photosToShow[randomNum].imageSrc});
			}
		});
	});
});

router.get('/standings', function(req, res, next){
	db.collection('cars').find().toArray(function(error, result){
		standingsArray = [];
		for (i=0; i<result.length; i++){
			standingsArray.push(result[i]);
		}
		standingsArray.sort(function(a,b){
			return (b.totalVotes - a.totalVotes);
		})
		res.render('standings', {theStandings: standingsArray});
	});
});

router.post('/electric', function(req, res, next){
	db.collection('users').insertOne({
		ip: req.ip,
		vote: 'electric',
		image: req.body.photo
	});
	db.collection('cars').find({imageSrc: req.body.photo}).toArray(function(error, result){
		if(isNaN(result[0].totalVotes)){
			total = 0;
		}else{
			total = result[0].totalVotes;
		}
		db.collection('cars').updateOne(
			{ imageSrc: req.body.photo },
			{ $set: {"totalVotes": (total + 1)}},
			function(error, results){
				console.log(db.collection('cars'));
			}
		);
	});
	res.redirect('/');
});

router.post('/poser', function(req, res, next){
	db.collection('users').insertOne({
		ip: req.ip,
		vote: 'poser',
		image: req.body.photo
	});  
  	db.collection('cars').find({imageSrc:req.body.photo}).toArray(function(error, result){
  		if(isNaN(result[0].totalVotes)){
  			total = 0;
  		}else{
  			total = result[0].totalVotes;
  		}
		db.collection('cars').updateOne(
			{ imageSrc: req.body.photo },
			{
				$set: {"totalVotes": (total - 1)}
			}, function(error, results){
				// console.log(results);
			}
		);
  	});  
	res.redirect('/');
});

router.post('/reset', function(req,res,next){
	console.log("hello reset");
	db.collection('users').remove();
	res.redirect('/');
});

module.exports = router;
