(function () {
    'use strict';

    angular.module('restbucks.invoice', [
        'ui.router',
        'restbucks.order'
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
                    })
                    .state('receipt', {
                        url: '/invoice/receipt/:id',
                        templateUrl: 'application/templates/receipt.html',
                        controller: 'InvoiceController',
                        controllerAs: 'invoice'
                    });

            }
        ]);
}());

