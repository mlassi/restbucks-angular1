describe('Order Service', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

    let $httpBackend, OrderService, $log;
    const baseURI = 'http://localhost:8000/api/order';
    const beverageURI = `${baseURI}/beverage`;

    const beverageList = [
        {id: 1, name: 'latte'},
        {id: 2, name: 'espresso'},
        {id: 3, name: 'coffee'},
        {id: 4, name: 'cappuccino'}
    ];

    beforeEach(inject(function ($injector) {
        OrderService = $injector.get('OrderService');
        $httpBackend = $injector.get('$httpBackend');
        $log = $injector.get('$log');

        spyOn($log, 'error');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be registered', function () {
        expect(OrderService).toBeDefined();
    });

    describe('beverages', function () {

        describe('get all beverages - happy path', function () {

            it('should return a list of 4 beverages when getting all beverages', function () {
                $httpBackend.whenGET(beverageURI).respond(beverageList);

                let result;
                const promise = OrderService.getAllBeverages();

                promise.then(function (response) {
                    result = response;
                });
                $httpBackend.flush();
                expect(result.length).toEqual(4);
            });
        });

        describe('get all beverages - failure path', function () {

            beforeEach(function () {
                $httpBackend.whenGET(beverageURI).respond(404);
            });

            it('should reject the promise when getting all beverages fails', function () {
                let result, expected = 'Error retrieving beverages.';
                const promise = OrderService.getAllBeverages();

                promise.then(function (response) {
                        result = response;
                    })
                    .catch(function (response) {
                        result = response;
                    });
                $httpBackend.flush();

                expect(result).toEqual(expected);
            });

            it('should log the error when getting all beverages fails', function () {
                let result;
                const promise = OrderService.getAllBeverages();

                promise.then(function (response) {
                        result = response;
                    })
                    .catch(function (response) {
                        result = response;
                    });
                $httpBackend.flush();

                expect($log.error).toHaveBeenCalled();
            });
        });


    });

    describe('send order', function () {

        let expectedOrder, order;
        beforeEach(function () {
            expectedOrder = {"location": "in store", "items": [{"name": "latte", "size": "small", "quantity": 1}]};
            order = {location: 'in store', items: [{name: "latte", size: "small", quantity: 1}]};
        });

        describe('send order - happy path', function () {

            it('should send one order when we have one order item', function () {
                $httpBackend.whenPOST(baseURI, expectedOrder).respond(201);
                const expected = 201;
                let result;
                const promise = OrderService.sendOrder(order);

                promise.then(function (response) {
                    result = response;
                });
                $httpBackend.flush();
                expect(result).toEqual(expected);
            });

        });

        describe('send order - failure path', function () {

            it('should log the error when sending an order fails', function () {
                $httpBackend.whenPOST(baseURI, expectedOrder).respond(500);
                const expected = 500;
                let result;
                const promise = OrderService.sendOrder(order);

                promise.then(function (response) {
                        result = response;
                    })
                    .catch(function (response) {
                        result = response;
                    });
                $httpBackend.flush();
                expect($log.error).toHaveBeenCalled();
            });

        });

    });

});

