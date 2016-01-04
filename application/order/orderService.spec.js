describe('Order Service', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

    // let deferred;
    let $httpBackend, $q, OrderService;
    const beverageList = [
        {id:1, name:'latte'},
        {id:2, name:'espresso'},
        {id:3, name:'coffee'},
        {id:4, name:'cappuccino'}
    ];

    beforeEach(inject(function ($injector) {
        OrderService = $injector.get('OrderService');
        $q = $injector.get('$q');

    }));

    it('should be registered', function (){
        expect(OrderService).toBeDefined();
    });

    xit('should return a list of 4 beverages', function () {
        expect(OrderController.allBeverages.length).toEqual(4);
    });

});

