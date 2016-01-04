describe('Order Service', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

    let $httpBackend, OrderService;
    const beverageList = [
        {id:1, name:'latte'},
        {id:2, name:'espresso'},
        {id:3, name:'coffee'},
        {id:4, name:'cappuccino'}
    ];

    beforeEach(inject(function ($injector) {
        OrderService = $injector.get('OrderService');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be registered', function (){
        expect(OrderService).toBeDefined();
    });

    it('should return a list of 4 beverages when getting all beverages', function () {
        $httpBackend.whenGET('api/beverages').respond(beverageList);

        let result;
        const promise = OrderService.getAllBeverages();

        promise.then(function (response) {
            result = response;
        });
        $httpBackend.flush();

        expect(result.length).toEqual(4);
    });

});

