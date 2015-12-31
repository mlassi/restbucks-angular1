'use strict';
angular.module('restbucks.Home').controller('HomeController', [
    '$scope', '$state', function ($scope, $state) {

        $scope.tabs = [
            { heading: 'Home', state:'home.coffee', active:false},
            { heading: 'Order History', state:'home.orderhistory', active:false}
        ];

        $scope.active = function(state){
            return $state.is(state);
        };

        $scope.$on('$stateChangeSuccess', function() {
            $scope.tabs.forEach(function(tab) {
                tab.active = $scope.active(tab.state);
            });
        });

}]);
