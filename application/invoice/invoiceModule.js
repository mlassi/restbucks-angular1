(function () {
    'use strict';

    angular.module('restbucks.invoice', [
        'ui.router'
    ]);

    angular.module('restbucks.invoice')
        .config(['$urlRouterProvider', '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {

                $stateProvider
                    .state('invoice', {
                        url: '/invoice/:id',
                        templateUrl: 'application/templates/invoice.html',
                        controller: 'InvoiceController',
                        controllerAs: 'invoice'
                    });

            }
        ]);
}());

