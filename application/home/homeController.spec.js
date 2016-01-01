describe('Home Controller', function () {

    beforeEach(module('restbucks'));

    var HomeController, scope, $controller, $rootScope;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        scope = $rootScope.$new();
        HomeController = $controller('HomeController as ctrl', {$scope: scope});
    }));

    it('Home Controller should be registered', function (){
        expect(HomeController).toBeDefined();
    });

    it('should have two tabs', function () {
        expect(scope.tabs.length).toEqual(2);
    })

});
