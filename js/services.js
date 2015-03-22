meteorApp.factory('locationService', ['$http', function ($http) {

    var locationApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json';

    this.getLocation = function(val) {

        var promise;

        promise = $http.get(locationApiUrl, {
            params: {
                address: val
            }
        }).then(function (response) {

            //Map response to leave fully formated address only
            return response.data.results.map(function (item) {
                return item.formatted_address;
            });

        });

        return promise;
    };

    this.addLocation = function(location) {

        var weatherLocations = this.getLocations();

        weatherLocations.unshift(location);

        //Limit stored location count
        if (weatherLocations.length > 5) {
            weatherLocations.length = 5;
        }

        localStorage.weatherLocations = JSON.stringify(weatherLocations);
    }

    this.getLocations = function() {

        return JSON.parse(localStorage.weatherLocations || '[]');

    }

    this.codeLatLng = function(lat, lng) {
        return $http.get(locationApiUrl, {
            params: {
                latlng: lat + ',' + lng,
                language: 'en'
            }
        });
    }

    return this;
}]);

meteorApp.factory('weatherService', ['$http', function ($http) {

    var weatherApiUrl = 'https://api.worldweatheronline.com/free/v2/weather.ashx';
    var weatherApiKey = 'e03bbbe77d90847638f1ed54fdf40';

    this.getWeatherInfo = function(location) {

        return $http.get(weatherApiUrl, {
            params: {
                q: location,
                key: weatherApiKey,
                format: 'json'
            }
        })

    }

    return this;
}]);