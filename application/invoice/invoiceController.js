(function () {
    'use strict';

    angular.module('restbucks.invoice')
        .controller('InvoiceController', ['$stateParams', 'OrderService',
            invoiceController]);

    function invoiceController($stateParams, OrderService) {
        let vm = this;
        vm.allPaymentMethods = [{name: 'VISA'}, {name:'MC'}, {name:'Amex'}, {name: 'Discover'}];
        vm.allExpiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

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
