describe('Invoice Service', function () {
    'use strict';

    beforeEach(module('restbucks.invoice'));

    let $httpBackend, InvoiceService, $log;
    const paymentURI = 'http://localhost:8000/api/payment';

    beforeEach(inject(function ($injector) {
        InvoiceService = $injector.get('InvoiceService');
        $httpBackend = $injector.get('$httpBackend');
        $log = $injector.get('$log');

        spyOn($log, 'error');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be registered', function () {
        expect(InvoiceService).toBeDefined();
    });

});

