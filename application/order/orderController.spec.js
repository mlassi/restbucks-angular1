describe('Order Controller', function () {
    'use strict';

    beforeEach(module('restbucks.order'));

   // let deferred;
    let OrderController, $controller, $q;
    const beverageList = [
        {id:1, name:'latte'},
        {id:2, name:'espresso'},
        {id:3, name:'coffee'},
        {id:4, name:'cappuccino'}
    ];

    beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
        $controller = $injector.get('$controller');
        OrderController = $controller('OrderController');

    }));

    it('should be registered', function (){
        expect(OrderController).toBeDefined();
    });

    xit('should return a list of 4 beverages', function () {
        expect(OrderController.allBeverages.length).toEqual(4);
    });

});

