'use strict';

angular.module('gohackerApp')
  .controller('MainCtrl', [ '$scope', function ($scope, $rootScope) {

    $scope.position = {};
    $scope.geoString = "Search 4 HakrSpaces";

    angular.extend($scope,
      { map:
        { control: {}
        , center:
          { latitude: $scope.position.latitude || 35
          , longitude: $scope.position.longitude || -100
          }
        , options:
          { maxZoom: 20
          , minZoom: 3
          }
        , zoom: 4
        , dragging: true
        }
      }
    )

    navigator.geolocation.getCurrentPosition( function( position ){
      $scope.position = position.coords;
      $scope.geoString = position.coords.latitude + ", " + position.coords.longitude;
      $scope.map.control.refresh( $scope.position )
      $scope.map.control.getGMap().setZoom( 11 )
    }, function( error ){
      alert('Error occurred. Error code: ' + error.code )
    })


    $scope.goSearch = function(){
      var query = $scope.query;
      var gc = new google.maps.Geocoder();
      var gcRequest = {};
          gcRequest.location = new google.maps.LatLng($scope.position.latitude, $scope.position.longitude);
          gcRequest.address = "Hackerspaces near "; // + $scope.position.latitude + ", " + $scope.position.longitude;

      gc.geocode( gcRequest, function( ResultsArray, GeocoderStatus){
        alert( ResultsArray);

      } );


      /*
      var searcher = new spaceSearch();
      var results = searcher.find( query );
      alert( results );
       */

    }


  }]);
