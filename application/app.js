(function () {
    'use strict';

    angular.module('restbucks', [
        'ui.router',
        'restbucks.home',
        'restbucks.order',
        'restbucks.invoice'
    ]);

    angular.module('restbucks').config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        }
    ]);
}());
