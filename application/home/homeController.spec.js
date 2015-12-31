describe('Home Controller', function () {

    beforeEach(module('restbucks'));

    var HomeController, scope, $controller, $rootScope;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        scope = $rootScope.$new();
        HomeController = $controller('HomeController as ctrl', {$scope: scope});
    }));

    it('should', function () {
        expect(true).toBeTruthy();
    })

    it('Home Controller should be registered', function (){
        expect(HomeController).toBeDefined();
    });

});
