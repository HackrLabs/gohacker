'use strict';

angular.module('gohackerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Find) {

    /**
     * How many decimal places to useon the
     * geo coords locations for the search string.
     * @type {Number}
     */
    var GEO_COORD_ACCURACY = 6;

    $scope.randomCoords = [ {'lat': 40.899304, 'lon': -73.948613 }
                           ,{'lat': 57.136982, 'lon': -2.167791 } ];

    /**
     * Return a random coordinate from the randomCoords array.
     * This could be fun...
     * @return {[type]} [description]
     */
    var getRandomCoord = function(){
      var idx = Math.floor( Math.random() * ( $scope.randomCoords.length-1 ) ) + 1;
      return $scope.randomCoords[idx];
    }

    /**
     * The position container
     * @type {Object}
     */
    $scope.position = {};
    $scope.position.icon = 'images/pin-blue-solid-3.png'

    /**
     * A String used in the Search params and the View input fields
     * @type {String}
     */
    $scope.spaces = [];

    /**
     * adding on some info for the map object
     * @type {Object}
     *
     * supplies default coords of: 35.1234,-100.1234
     */
    var rndCoord = getRandomCoord();
    angular.extend($scope,
      { map:
        { control: {}
        , center:
          { latitude: $scope.position.latitude || rndCoord.lat
          , longitude: $scope.position.longitude || rndCoord.lon
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

    /**
     * Do all the things.
     */
    navigator.geolocation.getCurrentPosition( function( position ){
      $scope.position.coords = position.coords;
      $scope.geoString = position.coords.latitude + ", " + position.coords.longitude;
      $scope.map.control.refresh( $scope.position.coords )
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
          for(var i = 0; i < $scope.spaces.length; i++){
            $scope.spaces[i].icon = 'images/pin-red-solid-3.png'
          }
      })
    }


  });
