describe('Home Controller', function () {
    'use strict';

    beforeEach(module('restbucks.home'));

    var HomeController, $controller;

    beforeEach(inject(($injector) => {
        $controller = $injector.get('$controller');
        HomeController = $controller('HomeController');
    }));

    it('should be registered', () => {
        expect(HomeController).toBeDefined();
    });

});
