describe('Invoice Controller', function () {
    'use strict';

    beforeEach(module('restbucks.invoice'));

    let InvoiceController, $controller, rootScope;

    beforeEach(inject(function ($injector) {
//        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');

        InvoiceController = $controller('InvoiceController');
    }));

    it('should be registered', function () {
        expect(InvoiceController).toBeDefined();
    });

});

