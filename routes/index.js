var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.	MONGOLAB_URI ||
			   process.env.MONGOHQ_URL ||
			   'mongodb://localhost:27017/electricProject';
var db;
var allPhotos;
//get pictures from database
MongoClient.connect(mongoUrl, function(error, database) {
	database.collection('cars').find().toArray(function(error, result){
		allPhotos = result;
		db = database;
		console.log(allPhotos);
	})
})

/* GET home page. */
router.get('/', function(req, res, next) {
	var currIP = req.ip;
	console.log("The current user's IP address is " + currIP);
	db.collection('users').find({ip:currIP}).toArray(function(error, userResult){
		//if user result returns nothing, then user hasn't voted on anything
		if(userResult.length == 0){
			photosToShow = allPhotos;
		}
		var randomNum = Math.floor(Math.random() * photosToShow.length);
		res.render('index', { carImage:allPhotos[randomNum].imageSrc});
	})
});
//Set up post electric page
router.get('/electric', function(req, res, next){
	res.send(req.body)
});

router.post('/electric', function(req, res, next){
	// res.send(req.body)
	db.collection('cars').updateOne(
		{ imageSrc: req.body.photo },
		{
			$set: {"totalVotes": 1}
		}, function(error, results){
			console.log(results);
		}
	)

	res.send("The user chose " + req.body.photo + " as an electric picture");
});
router.post('/poser', function(req, res, next){
	// res.send(req.body)
	res.send("The user chose " + req.body.photo + " as a poser picture");
});
module.exports = router;
