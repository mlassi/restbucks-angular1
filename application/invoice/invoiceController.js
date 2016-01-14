(function () {
    'use strict';

    angular.module('restbucks.invoice')
        .controller('InvoiceController', ['$state', '$stateParams', 'OrderService', 'InvoiceService',
            invoiceController]);

    function invoiceController($state, $stateParams, OrderService, InvoiceService) {
        let vm = this;
        vm.allPaymentMethods = [{name: 'VISA'}, {name:'MC'}, {name:'Amex'}, {name: 'Discover'}];
        vm.allExpiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        vm.allExpiryYears = ['2016', '2017', '2018', '2019', '2020'];

        OrderService.retrieveOrder($stateParams.id)
            .then(function(result) {
                vm.currentOrder = result;
            })
            .catch(showError);

        function showError(message) {
            alert(message);
        }

        vm.payOrder = function () {
            InvoiceService.payOrder(vm.currentOrder._id, createPayment())
                .then(function (response) {
                    $state.go('receipt', {id: vm.currentOrder._id});
                })
                .catch(showError);
        };

        function createPayment() {
            return {
                amount: vm.amount,
                cardHolderName: vm.cardHolderName,
                cardNumber: vm.cardNumber,
                expiryMonth: vm.expiryMonth,
                expiryYear: vm.expiryYear,
                cardType: vm.selectedPayment.name


            };
        }
    }

}());
