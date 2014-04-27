'use strict';

angular.module('gohackerApp')
  .controller('MainCtrl', function ($scope) {


  	/**
  	 * The map objects
  	 */
  	$scope.map = {
	    center: {
	        latitude: 45, //todo pull in live geocode
	        longitude: -73
	    },
	    zoom: 8,
	    draggable: "true",
	    options: false,
	    bounds: false
	};


  });
