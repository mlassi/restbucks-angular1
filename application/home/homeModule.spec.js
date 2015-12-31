describe('Home Controller', function () {
    'use strict';

    beforeEach(module('restbucks'));

    var $templateCache, $rootScope, scope, $state, $httpBackend;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $state = $injector.get('$state');
        $templateCache = $injector.get('$templateCache');
        $templateCache.put('tabNavTemplate.html', '');
        $httpBackend = $injector.get('$httpBackend');
        //  HomeController = $controller('HomeController', scope);
        $httpBackend.expectGET('template/tabNavTemplate.html').respond();
    }));

    xit('default state should be home', function() {
        $rootScope.$apply();
        expect($state.current.name).toEqual('home');
    });

    // view
    xit('state templateUrl should be home.html', function() {
        $state.go('home.coffee');
        $rootScope.$apply();
        expect($state.current.templateUrl).toEqual('home.html');
    });

    // controller
    xit('state controller should be HomeCtrl', function() {
        $rootScope.$apply();
        expect($state.current.controller).toEqual('HomeController');
    });

    xit('should be true', function () {
        expect(true).toEqual(true);
    });

});
