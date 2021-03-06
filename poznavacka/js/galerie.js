poznavackaApp.controller("galerieCtrl", function($scope, $http, loaderService) {
    ga('set', 'page', '/poznavacka/galerie');
    ga('send', 'pageview');
    $scope.setList = [];
    $scope.imgList = [];

    $scope.updateSelected = function() {
        $scope.imgList = [];
        for (var index = 0; index < $scope.setList.length; index++) {
            if ($scope.setList[index].enabled) {
                $http.get($scope.setList[index].file).then(function(data) {
                    $scope.imgList = $scope.imgList.concat(data.data);
                });
            }
        }
    };

    var loadSets = function() {
        $scope.setList = loaderService;
    };
    loadSets();
    $scope.updateSelected();

    $scope.next = function() {
        $scope.showSolution = false;
        $scope.thisOne = $scope.imgList[Math.floor((Math.random() * ($scope.imgList.length - 1)) + 0)];
        console.log($scope.thisOne);
    };
});