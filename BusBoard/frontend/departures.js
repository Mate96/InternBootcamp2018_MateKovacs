function getResult()
{
    var postcode = document.getElementById("postcode").elements["postcode"].value;
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/departureBoards/'+postcode, true);
    xhttp.setRequestHeader('Content-Type','application.json');
    xhttp.onload = function(){
     //   document.getElementById("results").innerHTML = xhttp.response.length;
        var responseJSON = JSON.parse(xhttp.response);
        if (responseJSON.error)
        {
            document.getElementById("results").innerHTML = responseJSON.error;
        }
        else
        {
            var resultHTML = '<h2>Results</h2>';
            for (let i=0;i<responseJSON.length;i++)
            {
                resultHTML += '<h3>' + responseJSON[i].stopName + ' (' + responseJSON[i].distance.toFixed(0) + 'm)</h3>';
                if(responseJSON[i].error.status === 200){
                    resultHTML += '<table style="width:15%"><tr>';
                    let buses = responseJSON[i].buses;
                    resultHTML += '<tr><th>Time to arrive</th><th>Bus line</th></tr>';
                    for (let j=0;j<buses.length;j++)
                    {
                        let minutes = Math.floor(buses[j].timeToStation/60);
                        let seconds = buses[j].timeToStation - minutes*60;
                        seconds = (seconds<10) ? '0' + seconds.toString() : seconds.toString();
                        resultHTML += '<tr><td>' + minutes + ':' + seconds + '</td><td>' + buses[j].line + '</td></tr>';
                    }
                    resultHTML += '</table>';
                } else {
                    resultHTML += '<p>' + responseJSON[i].error.message + '</p>';
                }
            }
            document.getElementById("results").innerHTML = resultHTML;
        }
    }
    xhttp.send();
    
}