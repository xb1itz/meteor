meteorApp.directive('weatherIcon', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function ($scope, $element) {

            $element.addClass('icon-' + $scope.condition.weatherCode);

        }
    };
}]);