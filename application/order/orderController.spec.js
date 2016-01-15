describe('Order Controller', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

    let OrderController, OrderService, $controller, $q, deferredBeverages,
        deferredOrder, $rootScope, $state;
    const beverageList = [
        {id: 1, name: 'latte'},
        {id: 2, name: 'espresso'},
        {id: 3, name: 'coffee'},
        {id: 4, name: 'cappuccino'}
    ];

    beforeEach(inject( ($injector) => {
        $rootScope = $injector.get('$rootScope');
        $q = $injector.get('$q');
        $state = $injector.get('$state');
        OrderService = $injector.get('OrderService');
        $controller = $injector.get('$controller');

        deferredBeverages = $q.defer();
        deferredOrder = $q.defer();
        spyOn(OrderService, 'getAllBeverages').and.returnValue(deferredBeverages.promise);
        spyOn(OrderService, 'sendOrder').and.returnValue(deferredOrder.promise);
        spyOn($state, 'go');

        OrderController = $controller('OrderController');
    }));

    it('should be registered', () => {
        expect(OrderController).toBeDefined();
    });

    function setOrderItem() {
        OrderController.selectedBeverage = {name: 'latte'};
        OrderController.selectedSize = {name: 'small'};
        OrderController.quantity = 1;
    }

    describe('beverages', () => {

        it('should return a list of 4 beverages', function () {
            deferredBeverages.resolve(beverageList);
            $rootScope.$digest();

            expect(OrderController.allBeverages.length).toEqual(4);
        });

        it('should show error when get all beverages fails', () => {
            const expected = 'getAllBeverages failed.';
            spyOn(window, 'alert');

            deferredBeverages.reject(expected);
            $rootScope.$digest();

            expect(window.alert).toHaveBeenCalledWith(expected);
        });

        describe('shopping cart', () => {

            beforeEach(() => {
                setOrderItem();
            });

            it('should have one order item when adding one item to the cart', () => {
                const expected = 1;

                OrderController.addToCart();

                expect(OrderController.cart.length).toEqual(expected);
            });

            it('should have order and quantity in the cart', () => {
                const expected = {name: 'latte', size: 'small', quantity: 1};

                OrderController.addToCart();

                expect(OrderController.cart[0]).toEqual(expected);
            });

        });

        describe('order submit', () => {

            beforeEach(() => {
                OrderController.selectedLocation = {name: 'in store'};
                setOrderItem();
                OrderController.addToCart();
            });

            it('should submit the order to the service', () => {
                const expected = {location: 'in store', items: OrderController.cart};

                OrderController.submitOrder();

                expect(OrderService.sendOrder).toHaveBeenCalledWith(expected);
            });

            it('should show error message when sending the order fails', () => {
                const expected = 'sending order failed.';
                spyOn(window, 'alert');

                OrderController.submitOrder();
                deferredOrder.reject(expected);
                $rootScope.$digest();

                expect(window.alert).toHaveBeenCalledWith(expected);
            });

            it('should navigate to the invoice page after the order was submitted successfully', () => {

                OrderController.submitOrder();
                deferredOrder.resolve({_id: 123});
                $rootScope.$digest();

                expect($state.go).toHaveBeenCalledWith('invoice', {id: 123});
            });

        });

        describe('lookup data', () => {

            it('should have a list of three sizes', () => {
                expect(OrderController.allSizes.length).toEqual(3);
            });

            it('should have a list of two locations', () => {
                expect(OrderController.allLocations.length).toEqual(2);
            });

        });

    });

});

