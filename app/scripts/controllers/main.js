'use strict';

angular.module('gohackerApp')
  .controller('MainCtrl', function ($scope, $rootScope) {
    $scope.position = {};
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
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.position = position.coords
      $scope.map.control.refresh($scope.position)
      $scope.map.control.getGMap().setZoom(11)
    }, function(error){
      alert('Error occurred. Error code: ' + error.code)
    })
  });
