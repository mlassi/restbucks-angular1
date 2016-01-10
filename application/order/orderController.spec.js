describe('Order Controller', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

    let OrderController, OrderService, $controller, $q, deferred, $rootScope;
    const beverageList = [
        {id:1, name:'latte'},
        {id:2, name:'espresso'},
        {id:3, name:'coffee'},
        {id:4, name:'cappuccino'}
    ];

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $q = $injector.get('$q');
        OrderService = $injector.get('OrderService');
        $controller = $injector.get('$controller');

        deferred = $q.defer();
        spyOn(OrderService, 'getAllBeverages').and.returnValue(deferred.promise);

        OrderController = $controller('OrderController');
    }));

    it('should be registered', function (){
        expect(OrderController).toBeDefined();
    });

    function setOrderItem() {
        OrderController.selectedBeverage = {name: 'latte'};
        OrderController.selectedSize = {name: 'small'};
        OrderController.quantity = 1;
    }

    describe('beverages', function () {

        it('should return a list of 4 beverages', function () {
            deferred.resolve(beverageList);
            $rootScope.$digest();

            expect(OrderController.allBeverages.length).toEqual(4);
        });

        it('should show error when get all beverages fails', function () {
            const expected = 'getAllBeverages failed.';
            spyOn(window, 'alert');

            deferred.reject(expected);
            $rootScope.$digest();

            expect(window.alert).toHaveBeenCalledWith(expected);
        });

        describe('shopping cart', function () {

            beforeEach(function () {
                setOrderItem();
            });

            it('should have one order item when adding one item to the cart', function () {
                const expected = 1;

                OrderController.addToCart();

                expect(OrderController.cart.length).toEqual(expected);
            });

            it('should have order and quantity in the cart', function () {
                const expected = {name: 'latte', size: 'small', quantity: 1};

                OrderController.addToCart();

                expect(OrderController.cart[0]).toEqual(expected);
            });

        });

    describe('order submit', function () {

        beforeEach(function () {
            setOrderItem();
            OrderController.addToCart();
        });

        it('should submit the order to the service', function () {
            const expected = OrderController.cart;
            spyOn(OrderService, 'sendOrder');

            OrderController.submitOrder();

            expect(OrderService.sendOrder).toHaveBeenCalledWith(expected);
        })

    });

    });

});

