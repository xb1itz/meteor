meteorApp.filter('forecast', function() {
    return function (intervals) {

        //Escape mapping empty array
        if (!intervals) {
            return;
        }

        var currentHour = new Date().getHours();
        var isForecast; 
        
        //Return only hourly intervals that happens in the future
        return $.map(intervals, function (interval, index) {

            //Instantly man hourly data if forecast flag is set
            if (isForecast) {
                return interval;
            }

            if (interval.time / 100 > currentHour) {
                
                //Set forecast flag to true to know where future houly data starts
                isForecast = true;
                
                return interval;
            }

        });

    };
});