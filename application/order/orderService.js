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
            transformOrder: transformOrder
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
            return $http.post(baseURI,
                transformOrder(order)
                )
                .then(function (response) {
                    return response.status;
                });
        }

        function transformOrder(order) {
            let result = {items: []};
            order.map(function (item) {
                result.items.push(item);
            });

            return result;
        }

    }

}());
