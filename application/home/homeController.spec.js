describe('Home Controller', function () {

    beforeEach(module('restbucks.home'));

    var HomeController, $controller;

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        HomeController = $controller('HomeController');
    }));

    it('Home Controller should be registered', function (){
        expect(HomeController).toBeDefined();
    });

});
