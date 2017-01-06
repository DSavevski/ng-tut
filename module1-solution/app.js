(function() {
    'use strict'
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {


        $scope.check = function() {
            if ($scope.food != undefined && $scope.food != "") {
                var parts = $scope.food.split(',');
                var cnt = 0;

                for (var tmp in parts) {
                    //console.log(parts[tmp]);
                    if (parts[tmp].length >= 1) { //checking for an empty string
                        cnt++;
                    }
                }

                if (cnt > 3) {
                    $scope.message = 'Too much!';
                } else {
                    $scope.message = 'Enjoy!';
                }
                $scope.color = 'success';
                $scope.state = 'success';

            } else {
                $scope.message = 'Please enter data first';
                $scope.color = 'danger';
                $scope.state = 'error';
            }
        }
    }



})();
