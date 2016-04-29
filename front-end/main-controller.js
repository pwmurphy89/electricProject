var electricProject = angular.module("electricProject",[]);
electricProject.controller("main-controller",function($scope,$http){

function loadPage(endURL){
	var apiUrl = "http://localhost:3000";


	$http({method:'GET', url: apiUrl + endURL}).then(
		function successCallback(response){
			$scope.message = response.data.theStandings[0];
		}
	), function errorCallback(response){
			$scope.message = "ERROR";
	}
}

$scope.loadStandings = function(){
	console.log('loadStandings was set');
	loadPage("/standings");
}

// $scope.otherFunctionName = function(){
// 	loadPage("/reset");
// }
});