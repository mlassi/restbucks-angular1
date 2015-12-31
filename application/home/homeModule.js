'use strict';

angular.module('restbucks.Home', [
    'ui.router',
    'ui.bootstrap'
]);

angular.module('restbucks.Home')
    .config(['$urlRouterProvider', '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {

            $urlRouterProvider
                .when('', '/home/order')
                .when('/', '/home/order');

            $stateProvider
                .state('home', {
                    abstract: true,
                    url: '/home',
                    templateUrl: 'template/tabNavTemplate.html',
                    controller: 'HomeController'
                })
                .state('home.coffee', {
                    url: '/order',
                    templateUrl: 'application/home/views/coffee.html',
                    controller: 'OrderController'
                })
                .state('home.orderhistory', {
                    url: '/history',
                    templateUrl: 'application/home/views/history.html',
                    controller: 'OrderHistoryController'
                });
        }
    ]);
