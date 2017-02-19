var poznavackaApp = angular.module("poznavackaApp", ["ngRoute"]);

poznavackaApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/poznavacka', {
                templateUrl: 'html/poznavacka.html',
                controller: 'poznavackaCtrl'
            }).
            when('/galerie', {
                templateUrl: 'html/galerie.html',
                controller: 'galerieCtrl'
            }).
            otherwise({
                redirectTo: 'poznavacka'
            })
    }
]);

poznavackaApp.factory("loaderService", function (poznavackaConfig) {
      return poznavackaConfig.setList;
});

poznavackaApp.constant("poznavackaConfig", {
    setList: [
      {name: "mekkysi", desc: "Měkkýši (Pracuje se na tom)", enabled: false, file: "clenovci.json"},
      {name: "clenovci", desc: "Členovci", enabled: true, file: "clenovci.json"}
    ]
});

poznavackaApp.controller("mainCtrl", function($scope, $location) {
  $scope.isActive = function (viewLocation) {
       var active = (viewLocation === $location.path());
       return active;
  };
});
