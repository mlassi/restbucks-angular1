(function () {
    'use strict';

    angular.module('restbucks.order', [
        'ui.router'
    ]);

    angular.module('restbucks.order')
        .config(['$urlRouterProvider', '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {

                $stateProvider
                    .state('order', {
                        url: '/order',
                        templateUrl: 'application/templates/order.html',
                        controller: 'OrderController',
                        controllerAs: 'order'
                    });

            }
        ]);
}());
