(function () {
    'use strict';

    angular.module('restbucks.order')
        .controller('OrderController', ['OrderService',
            orderController]);

    function orderController(OrderService) {

        var vm = this;
        vm.cart = [];

        OrderService.getAllBeverages()
            .then(function(result) {
                vm.allBeverages = result;
                vm.selectedBeverage = result[0];
            })
            .catch(showError);

        function showError(message) {
            alert(message);
        }

        vm.addToCart = function() {
            vm.cart.push({name: vm.selectedBeverage.name, quantity: vm.quantity});
        };

        vm.submitOrder = function() {
            OrderService.sendOrder(vm.cart);
        };
    }

}());

