poznavackaApp.controller("poznavackaCtrl", function($scope, $http, loaderService) {
    ga('set', 'page', '/poznavacka/poznavacka');
    ga('send', 'pageview');
    console.log("poznavacka");
    $scope.setList = [];
    $scope.imgList = [];

    var setsChanged = false;
    var selectedSets = [];

    $scope.updateSelected = function() {
        $scope.imgList = [];
        selectedSets = [];
        for (var index = 0; index < $scope.setList.length; index++) {
            if ($scope.setList[index].enabled) {
                $http.get($scope.setList[index].file).then(function(data) {
                    $scope.imgList = $scope.imgList.concat(data.data);
                });
                selectedSets.push($scope.setList[index]);
            }
        }
        setsChanged = true;
    };

    var loadSets = function() {
        $scope.setList = loaderService;
    };
    loadSets();
    $scope.updateSelected();

    $scope.next = function() {
        $scope.showSolution = false;
        $scope.thisOne = $scope.imgList[Math.floor((Math.random() * ($scope.imgList.length - 1)) + 0)];
        if (setsChanged) {
            var selectedString = selectedSets.map(function(obj) { return obj.name; }).join(",");
            ga('send', 'event', 'Poznávačka', 'Změna kategorie', selectedString);
            setsChanged = false;
        }
    };
});

poznavackaApp.filter('default', [function() {
    return function(value, def) {
        return value || def;
    };
}]);