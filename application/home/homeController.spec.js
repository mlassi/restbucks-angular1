describe('Home Controller', function () {

    beforeEach(module('restbucks.home'));

    var HomeController, $controller;

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        HomeController = $controller('HomeController');
    }));

    it('should be registered', function (){
        expect(HomeController).toBeDefined();
    });

});
