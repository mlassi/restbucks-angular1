(function () {
    'use strict';

    angular.module('restbucks.order')
        .controller('OrderController', ['OrderService',
            orderController]);

    function orderController(OrderService) {

        var vm = this;

        OrderService.getAllBeverages()
            .then(function(result) {
                vm.allBeverages = result;
                vm.selectedBeverage = result[0];
            })
            .catch(showError);

        function showError(message) {
            alert(message);
        }
    }

}());

