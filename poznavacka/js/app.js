var poznavackaApp = angular.module("poznavackaApp", ["ngRoute"]);

poznavackaApp.config(['$routeProvider',
    function($routeProvider) {
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

poznavackaApp.factory("loaderService", function(poznavackaConfig) {
    return poznavackaConfig.setList;
});

poznavackaApp.constant("poznavackaConfig", {
    setList: [
        { name: "mekkysi", desc: "Měkkýši (Pracuje se na tom)", enabled: false, file: "clenovci.json" },
        { name: "clenovci1", desc: "Členovci 1. část", enabled: false, file: "clenovci1.json" },
        { name: "clenovci2", desc: "Členovci 2. část", enabled: false, file: "clenovci2.json" },
        { name: "clenovci3", desc: "Členovci 3. část", enabled: false, file: "clenovci3.json" },
        { name: "clenovci", desc: "Členovci vše", enabled: false, file: "clenovci.json" },
        { name: "ryby", desc: "Ryby a paryby", enabled: false, file: "ryby.json" },
        { name: "plazi", desc: "Obojživelníci a plazi", enabled: false, file: "plazi.json" },
        { name: "ptaci", desc: "Práci", enabled: true, file: "ptaci.json" }
    ]
});

poznavackaApp.controller("mainCtrl", function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
});