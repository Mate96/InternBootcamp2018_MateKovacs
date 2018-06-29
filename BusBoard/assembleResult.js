module.exports = function (info, sortedStops)
{
    var result = [];
    for(i = 0; i<info.length; i++){
        let sorted = info[i].body.sort(function(a,b){
            return(a.timeToStation -b.timeToStation);
        });
        let buses = [];
        for(let j = 0; j<5; j++){
            buses.push({line: sorted[j].lineName, timeToStation: sorted[j].timeToStation});
        }
        
        let stop = {stopName: sortedStops[i].commonName,distance: sortedStops[i].distance, buses: buses};
        result.push(stop);
    }
    return result;
}
