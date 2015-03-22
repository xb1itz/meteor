var meteorApp = angular.module('meteor', [
    'ui.bootstrap',
    'ui.router'
]);

meteorApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        //Redirect to index state from any invalid stare
        $urlRouterProvider.otherwise("/");

        $stateProvider

            .state('index', {
                url: "/",
                controller: 'weather',
                templateUrl: "views/weather.html",
                params: {
                    city: null
                }
            })

            .state('location', {
                url: "/location",
                controller: 'location',
                templateUrl: "views/location.html"
            })            


    }]);




