var electricProject = angular.module("electricProject",[]);
electricProject.controller("myController",function($scope, $http){
	var cars = [
		"peel.jpg",
		"tesla.jpg",
		"teslax.jpg",
		"yellow.jpg"
	];
	
	var randomNum = Math.floor(Math.random() * cars.length);
	$scope.cars = "../public/images/" + cars[randomNum];

})