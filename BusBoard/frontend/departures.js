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
                    resultHTML += '<ul>';
                    let buses = responseJSON[i].buses;
                    for (let j=0;j<buses.length;j++)
                    {
                        resultHTML += '<li>' + buses[j].timeToStation + ' seconds: ' + buses[j].line + '</li>';
                    }
                    resultHTML += '</ul>';
                } else {
                    resultHTML += '<p>' + responseJSON[i].error.message + '</p>';
                }
            }
            document.getElementById("results").innerHTML = resultHTML;
        }
    }
    xhttp.send();
    
}