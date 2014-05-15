'use strict';

angular.module('gohackerApp')
  .factory('Find', function ($http) {
    var endpoint = '/api';
    function load(path, params){
      params = params || [];
      return $http.get
      ( endpoint + path
      )
    }

    // Public API here
    return {
      getSpace: function (search) {
        return load('/search/' + search);
      }
    };
  });
