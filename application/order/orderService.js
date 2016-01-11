(function () {
    'use strict';

    angular.module('restbucks.order')
        .factory('OrderService', ['$http', '$q', '$log', orderService]);

    function orderService($http, $q, $log) {

        const baseURI = 'http://localhost:8000/api/order';
        const beverageURI = `${baseURI}/beverage`;

        return {
            getAllBeverages: getAllBeverages,
            sendOrder: sendOrder,
            retrieveOrder: retrieveOrder
        };

        function getAllBeverages() {
            return $http.get(beverageURI)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving beverages: ' + response.statusText);
                    return $q.reject('Error retrieving beverages.');
                })
        }

        function sendOrder(order) {
            return $http.post(baseURI, order)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    $log.error(`Error sending order: ${response.statusText}`);
                    return $q.reject('Error sending order.');
                });
        }

        function retrieveOrder(orderId) {
            return $http.get(baseURI, orderId)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    $log.error(`Error retrieving order id: ${orderId} error ${response.statusText}`);
                    return $q.reject(`Error retrieving order ${orderId}.`);
                });
        }

    }

}());
