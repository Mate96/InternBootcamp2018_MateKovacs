const util = require('util');
const request = require('request');
const prequest = util.promisify(request);

module.exports = {
    getStop: function (location,radius){
                return prequest('https://api-radon.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius=' + radius + '&modes=bus&lon=' + location.longitude + '&lat=' + location.latitude, { json: true });
            },
    getSorted: function (res){
                    let sortedStops = res.body.stopPoints.sort(function(a,b){
                        return(a.distance -b.distance);
                    });
                    let promises = [];
                    for(i=0; i<2 && i<sortedStops.length; i++){
                    promises.push(prequest('https://api.tfl.gov.uk/StopPoint/' + sortedStops[i].id + '/Arrivals', { json: true }));
                    }
                    return {promises: promises, stops: sortedStops};
                }
};