'use strict';

angular.module('restbucks', [
    'ui.bootstrap',
    'ui.router',
    'ui.bootstrap.tpls',
    'restbucks.Home'
]);

angular.module('restbucks').config(['$urlRouterProvider',
    function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
]);
