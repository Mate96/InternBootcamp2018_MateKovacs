const http = require('http');
const readlinesync = require('readline-sync');
const util = require('util');
const request = require('request');
const prequest = util.promisify(request);
const express = require('express');
const assembleResult = require('./assembleResult');
const api = require('./api');

const app = express();

app.get('/departureBoards/:postcode', (req, res) => {

    let locationP = prequest('http://api.postcodes.io/postcodes/'+req.params.postcode, { json: true });

    locationP.then(result => {
        if(result.body.error){
            res.send({error: result.body.error});
        }else{
            return {longitude: result.body.result.longitude,latitude: result.body.result.latitude};
        }
    }).then( location => {
        return api.getStop(location,1000);
    }).then(result => {
        if (result.body.stopPoints.length === 0)
        {
            res.send({error: 'No stops found'});
            return;
        }
        let sorted = api.getSorted(result);
        Promise.all(sorted.promises).then(info => {
            console.log(info[0].body);
            res.send(assembleResult(info, sorted.stops));
        });
    });

});

app.use(express.static('frontend'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
