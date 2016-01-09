(function () {

    angular.module('restbucks.order')
        .factory('OrderService', ['$http', '$q', '$log', orderService]);

    function orderService($http, $q, $log) {

        const server = 'http://localhost:8000/api';
        const beverageURI = `${server}/order/beverage`;

        return {
            getAllBeverages: getAllBeverages
        };

        function getAllBeverages() {
            return $http.get(beverageURI)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving beverages: ' + response.statusText);
                    return $q.reject('Error retrieving beverages.');
                })
        }

    }

}());
