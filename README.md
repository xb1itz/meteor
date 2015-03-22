# meteor
AngularJS demo weather app

### Install instructions
Plug & Play

### Components 

 - Controllers:
	 - weather: loads weather data based on selected location
	 - location: provides location selection functions
 - Services:
	 - locationService: handles geocoding API requests & local storage
	 - weatherService: handles weather API requests
 - Filters:
	 - forecast: filters only future weather forecasts from hourly data
 - Directives:
	 - weatherIcon: sets weather icons

### Third party modules

 - AngularJS UI router https://github.com/angular-ui/ui-router
 - Angular UI Bootstrap https://angular-ui.github.io/bootstrap/ (custom build for Typeahead component only)
