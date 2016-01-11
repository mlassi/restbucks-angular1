(function () {
    'use strict';

    angular.module('restbucks.order')
        .controller('OrderController', ['OrderService', '$state',
            orderController]);

    function orderController(OrderService, $state) {
        let vm = this;
        vm.cart = [];
        vm.allSizes = [{name: "small"}, {name: "medium"}, {name: "large"}];
        vm.allLocations = [{name: "in store"}, {name: "to go"}];

        OrderService.getAllBeverages()
            .then(function(result) {
                vm.allBeverages = result;
            })
            .catch(showError);

        function showError(message) {
            alert(message);
        }

        vm.addToCart = function() {
            const orderItem = {
                name: vm.selectedBeverage.name,
                size: vm.selectedSize.name,
                quantity: vm.quantity
            };
            vm.cart.push(orderItem);
        };

        vm.submitOrder = function() {
            OrderService.sendOrder(createOrder())
                .then(function(response) {
                    $state.go('invoice', {id: response._id});
                })
                .catch(showError);
        };

        function createOrder() {
            return {
                location: vm.selectedLocation.name,
                items: vm.cart
            };
        }
    }

}());

