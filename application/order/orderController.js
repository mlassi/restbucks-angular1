(function () {
    'use strict';

    angular.module('restbucks.order')
        .controller('OrderController', ['OrderService', '$log',
            orderController]);

    function orderController(OrderService, $log) {

        var vm = this;

        OrderService.getAllBeverages()
            .then(function(result) {
                vm.allBeverages = result;
            });
    }

}());

