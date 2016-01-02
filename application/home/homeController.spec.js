describe('Home Controller', function () {

    beforeEach(module('restbucks'));

    var HomeController, scope, $controller, $rootScope, $state;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $state = $injector.get('$state');
        scope = $rootScope.$new();
        HomeController = $controller('HomeController as ctrl', {$scope: scope});
    }));

    it('Home Controller should be registered', function (){
        expect(HomeController).toBeDefined();
    });

    it('should have two tabs', function () {
        expect(scope.tabs.length).toEqual(2);
    });

    it('should be set to active when the $state is set to active', function () {
       spyOn($state, 'is').and.returnValue(true);
        HomeController = $controller('HomeController as ctrl', {$scope: scope});
        expect(scope.active('foo')).toBeTruthy();
    });

    it('should be set to inactive when the $state is set to inactive', function () {
        spyOn($state, 'is').and.returnValue(false);
        HomeController = $controller('HomeController as ctrl', {$scope: scope});
        expect(scope.active('bar')).toBeFalsy();
    });

    it('should set the first tab to active when the $stateChangeSuccess event fires', function () {
       spyOn($state, 'is').and.callFake(function (state) {
           return state === 'home.coffee';
       });
        scope.$broadcast('$stateChangeSuccess');
        expect(scope.tabs[0].active).toBeTruthy();

    });

});
