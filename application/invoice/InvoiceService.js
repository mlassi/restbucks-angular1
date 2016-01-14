(function () {
    'use strict';

    angular.module('restbucks.invoice')
        .factory('InvoiceService', ['$http', '$q', '$log', invoiceService]);

    function invoiceService($http, $q, $log) {

        const paymentURI = 'http://localhost:8000/api/payment';

        return {
            payOrder: payOrder
        };

        function payOrder(orderId, payment) {
            return $http.post(`${paymentURI}/${orderId}`, payment)
                .then(function (response) {
                    return response.status;
                })
                .catch(function (response) {
                    $log.error(`Error sending payment: ${response.statusText}`);
                    return $q.reject('Error sending payment.');
                });
        }

    }

}());

