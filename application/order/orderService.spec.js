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

    beforeEach(inject( ($injector) => {
        OrderService = $injector.get('OrderService');
        $httpBackend = $injector.get('$httpBackend');
        $log = $injector.get('$log');

        spyOn($log, 'error');
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be registered', () => {
        expect(OrderService).toBeDefined();
    });

    describe('beverages', () => {

        describe('get all beverages - happy path', () => {

            it('should return a list of 4 beverages when getting all beverages', () => {
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

        describe('get all beverages - failure path', () => {

            beforeEach(() => {
                $httpBackend.whenGET(beverageURI).respond(404);
            });

            it('should reject the promise when getting all beverages fails', () => {
                let result, expected = 'Error retrieving beverages.';
                const promise = OrderService.getAllBeverages();

                promise.then((response) => {
                        result = response;
                    })
                    .catch((response) => {
                        result = response;
                    });
                $httpBackend.flush();

                expect(result).toEqual(expected);
            });

            it('should log the error when getting all beverages fails', () => {
                let result;
                const promise = OrderService.getAllBeverages();

                promise.then((response) => {
                        result = response;
                    })
                    .catch((response) => {
                        result = response;
                    });
                $httpBackend.flush();

                expect($log.error).toHaveBeenCalled();
            });
        });


    });

    describe('send order', () => {

        let expectedOrder, order;
        beforeEach(() => {
            expectedOrder = {"location": "in store", "items": [{"name": "latte", "size": "small", "quantity": 1}]};
            order = {location: 'in store', items: [{name: "latte", size: "small", quantity: 1}]};
        });

        describe('send order - happy path', () => {

            it('should send one order when we have one order item', () => {
                const expected = {_id: 123};
                $httpBackend.whenPOST(baseURI, expectedOrder).respond(201, {_id: 123});
                let result;
                const promise = OrderService.sendOrder(order);

                promise.then((response) => {
                    result = response;
                });
                $httpBackend.flush();
                expect(result).toEqual(expected);
            });

        });

        describe('send order - failure path', () => {

            it('should log the error when sending an order fails', () => {
                $httpBackend.whenPOST(baseURI, expectedOrder).respond(500);
                const expected = 500;
                let result;
                const promise = OrderService.sendOrder(order);

                promise.then((response) => {
                        result = response;
                    })
                    .catch((response) => {
                        result = response;
                    });
                $httpBackend.flush();
                expect($log.error).toHaveBeenCalled();
            });

        });

    });

    describe('retrieve order', () => {

        it('should return the order if it exists', () => {
            let result;
            const expected = {id: 123};
            const promise = OrderService.retrieveOrder(123);
            $httpBackend.whenGET(`${baseURI}/123`).respond(expected);

            promise.then((response) => {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(expected);
        });

        it('should return error when the order cannot be found', () => {
            let result;
            const expected = 'Error retrieving order 456';
            $httpBackend.whenGET(`${baseURI}/456`).respond(expected);
            const promise = OrderService.retrieveOrder(456);

            promise.then((response) => {
                    result = response;
                })
                .catch((response) => {
                    result = response;
                });
            $httpBackend.flush();

            expect(result).toEqual(expected);
        });

    });

});

