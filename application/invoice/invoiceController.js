(function () {
    'use strict';

    angular.module('restbucks.invoice')
        .controller('InvoiceController', ['$stateParams', 'OrderService',
            invoiceController]);

    function invoiceController($stateParams, OrderService) {
        let vm = this;

        OrderService.retrieveOrder($stateParams.id)
            .then(function(result) {
                vm.currentOrder = result;
            })
    }

}());
