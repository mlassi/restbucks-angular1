(function () {
    'use strict';

    angular.module('restbucks.invoice')
        .controller('InvoiceController', ['$stateParams', 'OrderService',
            invoiceController]);

    function invoiceController($stateParams, OrderService) {
        let vm = this;
        vm.allPaymentMethods = [{name: 'VISA'}, {name:'MC'}, {name:'Amex'}, {name: 'Discover'}];

        OrderService.retrieveOrder($stateParams.id)
            .then(function(result) {
                vm.currentOrder = result;
            })
            .catch(showError);

        function showError(message) {
            alert(message);
        }
    }

}());
