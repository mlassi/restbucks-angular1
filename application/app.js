'use strict';

angular.module('restbucks', [
    'ui.router',
    'restbucks.home'
]);

angular.module('restbucks').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        //$stateProvider
        //    .state('home', {
        //        url: '/',
        //        templateUrl: 'application/templates/home.html',
        //        controller: 'HomeController',
        //        controllerAs: 'home'
        //    }).state('schools', {
        //        url: '/schools',
        //        controller: 'AllSchoolsController',
        //        controllerAs: 'schools',
        //        templateUrl: '/app/templates/allSchools.html'
        //    })
        //    .state('classrooms', {
        //        url: '/classrooms',
        //        controller: 'AllClassroomsController',
        //        controllerAs: 'classrooms',
        //        templateUrl: '/app/templates/allClassrooms.html'
        //    });
    }
]);
