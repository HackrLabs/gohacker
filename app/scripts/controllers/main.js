'use strict';

angular.module('gohackerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Find) {

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
    },
     function(error){
        console.error(error)
     },
     { enableHighAccuracy: true
      , maximumAge: 7500
     }
    )

    /**
     * Searches a geocoder results array for the first object designated a 'locality'
     *
     * @param  {Array} items Geocoder Results Array
     * @return {String}       The locality i=items formatted_address field.
     */
    function getLocality( items ){
      for (var i = items.length - 1; i >= 0; i--) {
          if( items[i].types.indexOf('locality') > -1 ){
            return items[i].formatted_address;
          }
      };
    }


    $scope.goSearch = function(){
      var query = $scope.query;
      var gc = new google.maps.Geocoder();
      var gcRequest = {};
          gcRequest.location = new google.maps.LatLng($scope.position.latitude, $scope.position.longitude);

          //This produces 0 results.
          //gcRequest.address = "Hackerspaces";
      /*
      gc.geocode( gcRequest, function( ResultsArray, GeocoderStatus){

        if ( GeocoderStatus == "OK" ){
          var locality = getLocality( ResultsArray );
          alert( GeocoderStatus + "\nResults for: " + locality + "\n" + ResultsArray.length + " items.");
        }else{
          alert( GeocoderStatus + "\nNo Results found!");
        }

      } );
    */

      //pseudo for API
      Find.getSpace(query).then(function(res){
        var data = res.data
        if(data.status != 200)
          alert('No Space Found')
        else
          $scope.spaces = data.spaces
      })
    }


  });
