module.exports = function (info, sortedStops)
{
    var result = [];
    for(i = 0; i<info.length; i++){
        console.log(info[i].body);
        let sorted = info[i].body.sort(function(a,b){
            return(a.timeToStation -b.timeToStation);
        });
        //console.log(sorted);
        let buses = [];
        let error = sorted.length === 0 ? {status: 404, message: 'Live arrival times unavailable.'} :  {status: 200, message: 'OK'};
        for(let j = 0; j<5 && j<sorted.length; j++){
            buses.push({line: sorted[j].lineName, timeToStation: sorted[j].timeToStation});
        }
        
        let stop = {stopName: sortedStops[i].commonName,distance: sortedStops[i].distance, buses: buses, error: error};
        result.push(stop);
    }
    return result;
}
