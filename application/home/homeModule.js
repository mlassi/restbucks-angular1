
(function () {
    'use strict';

angular.module('restbucks.home', [
    'ui.router'
]);

angular.module('restbucks.home')
    .config(['$urlRouterProvider', '$stateProvider',
        ($urlRouterProvider, $stateProvider) => {

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'application/templates/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                });

        }
    ]);
}());
