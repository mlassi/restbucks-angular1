describe('Invoice Controller', function () {
    'use strict';

    beforeEach(module('restbucks.invoice', 'restbucks.order'));

    let InvoiceController, $controller, $rootScope, OrderService, deferredPromise, $q;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $q = $injector.get('$q');
        OrderService = $injector.get('OrderService');

        deferredPromise = $q.defer();
        spyOn(OrderService, 'retrieveOrder').and.returnValue(deferredPromise.promise);

        InvoiceController = $controller('InvoiceController');
    }));

    it('should be registered', function () {
        expect(InvoiceController).toBeDefined();
    });

    it('should retrieve the current order when landing on the page', function () {
        const expected = {id: 123};


        deferredPromise.resolve(expected);
        $rootScope.$digest();

        expect(InvoiceController.currentOrder).toEqual(expected);
    });

    it('should show error message when retrieving the current order fails', function () {
        const expected = 'retrieving order failed.';
        spyOn(window, 'alert');

        deferredPromise.reject(expected);
        $rootScope.$digest();

        expect(window.alert).toHaveBeenCalledWith(expected);
    });

    it('should have 4 different payment methods', function () {

        expect(InvoiceController.allPaymentMethods.length).toEqual(4);
    })

    it('should have 12 months as expiry months', function() {
       expect(InvoiceController.allExpiryMonths.length).toEqual(12);
    });

});

