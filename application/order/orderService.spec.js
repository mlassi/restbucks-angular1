describe('Order Service', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

    let $httpBackend, OrderService, $log;
    const beverageURI = 'http://localhost:8000/api/order/beverage';
    const beverageList = [
        {id:1, name:'latte'},
        {id:2, name:'espresso'},
        {id:3, name:'coffee'},
        {id:4, name:'cappuccino'}
    ];

    beforeEach(inject(function ($injector) {
        OrderService = $injector.get('OrderService');
        $httpBackend = $injector.get('$httpBackend');
        $log = $injector.get('$log');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be registered', function (){
        expect(OrderService).toBeDefined();
    });

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
            spyOn($log, 'error');
        });

        it('should reject the promise when getting all beverages fails', function () {
            let result, expected = 'Error retrieving beverages.';
            const promise = OrderService.getAllBeverages();

            promise.then(function (response) {
                    result = response;
                })
                .catch(function(response) {
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
                .catch(function(response) {
                    result = response;
                });
            $httpBackend.flush();

            expect($log.error).toHaveBeenCalled();
        });
    });





});

