describe('Order Controller', function () {

    beforeEach(module('restbucks.order'));

    var OrderController, $controller;

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        OrderController = $controller('OrderController');
    }));

    it('should be registered', function (){
        expect(OrderController).toBeDefined();
    });

});

