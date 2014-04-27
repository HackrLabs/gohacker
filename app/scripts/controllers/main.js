'use strict';

angular.module('gohackerApp')
  .controller('MainCtrl', function ($scope, $rootScope) {
    $scope.position = 
    { latitude: 35
    , longitude: -100
    }
    navigator.geolocation.getCurrentPosition(function(position){
    $scope.position = position.coords
      $scope.position = position
    }, function(error){
      alert('Error occurred. Error code: ' + error.code)
    })
  	/**
  	 * The map objects
  	 */
  	$scope.map = {
	    center: {
	        latitude: $scope.position.latitude,
	        longitude: $scope.position.longitude
	    },
	    zoom: 4,
	    draggable: "true",
	    options: false,
	    bounds: false
	};


  });
