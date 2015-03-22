meteorApp.controller('location', ['$scope', '$state', 'locationService',
    function ($scope, $state, locationService) {

        $scope.getLocation = locationService.getLocation;
        $scope.storedLocations = locationService.getLocations();

        $scope.showWeather = function(location) {

            locationService.addLocation(location);

            $state.go('index', {
                city: location
            });
        }

        $scope.geocoderSuccess = function(position) {

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            //Get location name with reverse geocoding
            locationService.codeLatLng(lat, lng).then(function (response) {
                
                var addressComponents = response.data.results[0].address_components;

                angular.forEach(addressComponents, function (component) {

                    //Parse city name from address components
                    if (component.types.indexOf('locality') !== -1) {
                        $scope.city = component.long_name;
                    }

                });

            });
        }

        $scope.geocoderFailed = function() {
            console.error("Geocoder failed");
        }

        //Initialize geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.geocoderSuccess, $scope.geocoderFailed);
        }

}]);

meteorApp.controller('weather', ['$scope', '$state', 'weatherService', 'locationService',
    function ($scope, $state, weatherService, locationService) {

        var storedLocations = locationService.getLocations();

        //Check for location data and redirect to location state if there are none
        if (storedLocations.length) {

            //Chack local storage for saved location data
            $scope.city = storedLocations[0];

        } else if ($state.params.city) {

            //Check for location data in state params
            $scope.city = $state.params.city;   

        } else {
            $state.go('location');
        }

        //Load weather info and populate binding variables
        weatherService.getWeatherInfo($scope.city).then(function(response) {

            $scope.condition = response.data.data.current_condition[0];  
            $scope.hourlyWeather = $.map(response.data.data.weather, function (day, index) {
                return day.hourly;
            });  

        });
}]);