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

    describe('send order', function () {

        it('should return HTTP 200 when the payment was sent successfully', function () {
            $httpBackend.whenPOST(`${paymentURI}/123`, {}).respond(200);

            let result;
            const promise = InvoiceService.payOrder(123, {});

            promise.then(function (response) {
                result = response;
            });
            $httpBackend.flush();
            expect(result).toEqual(200);
        });

        it('should log the error when sending a payment fails', function () {
            $httpBackend.whenPOST(`${paymentURI}/456`, {}).respond(500);
            const expected = 500;
            let result;
            const promise = InvoiceService.payOrder(456, {});

            promise.then(function (response) {
                    result = response;
                })
                .catch(function (response) {
                    result = response;
                });
            $httpBackend.flush();
            expect($log.error).toHaveBeenCalled();
        });
    });

});

