(function () {
    'use strict';

    angular.module('restbucks.invoice')
        .factory('InvoiceService', ['$http', '$q', '$log', invoiceService]);

    function invoiceService($http, $q, $log) {

        const paymentURI = 'http://localhost:8000/api/payment';

        return {
            payOrder: payOrder
        };

        function payOrder() {

        }

    }

}());

