
describe('Invoice Controller', function () {
    'use strict';

    beforeEach(module('restbucks.invoice', 'restbucks.order'));

    let InvoiceController, $controller, $rootScope, OrderService,
        InvoiceService, deferredPromise, $q, $state, deferred;

    function setPaymentToController(ctrl) {
        ctrl.currentOrder = {id: 123};
        ctrl.amount = 5;
        ctrl.cardHolderName = "John Doe";
        ctrl.selectedPayment = {name: "VISA"};
        ctrl.cardNumber = "4111111111111111";
        ctrl.expiryMonth = "06";
        ctrl.expiryYear = "2016";
    }

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $q = $injector.get('$q');
        $state = $injector.get('$state');
        OrderService = $injector.get('OrderService');
        InvoiceService = $injector.get('InvoiceService');

        deferredPromise = $q.defer();
        deferred = $q.defer();
        spyOn(OrderService, 'retrieveOrder').and.returnValue(deferredPromise.promise);
        spyOn(InvoiceService, 'payOrder').and.returnValue(deferred.promise);

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

    it('should have 5 years as expiry years', function() {
       expect(InvoiceController.allExpiryYears.length).toEqual(5);
    });

    it('should send a payment to the service', function () {
        setPaymentToController(InvoiceController);

        InvoiceController.payOrder();

        expect(InvoiceService.payOrder).toHaveBeenCalled();
    });

    it('should send order and payment to the invoice service', function () {
        const expected = {
            amount: 5, cardHolderName: "John Doe", cardNumber: "4111111111111111"
            , expiryMonth: "06", expiryYear: "2016", cardType: "VISA"};
        setPaymentToController(InvoiceController);

        InvoiceController.payOrder();

        expect(InvoiceService.payOrder).toHaveBeenCalledWith(123, expected);
    });

    it('should send the payment and navigate to result page', function () {
        spyOn($state, 'go');

        deferred.resolve(200);
        $rootScope.$digest();

        expect($state.go).toHaveBeenCalledWith('receipt');
    })

});

