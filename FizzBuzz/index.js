//////////////////////////////////////////////////////
// Rules
//////////////////////////////////////////////////////
// Note that common interface is needed for simple implementation

var getRule = function(n){

    switch(n){

        case 1:
            return{
                // Push
                func: function(msg,str,char){
                    msg.push(str);
                }
            }

        case 2:
            return{
                // Overwrite
                func: function(msg,str,char){
                    var originalLength = msg.length;
                    msg.splice(0, originalLength, str)
                }
            }

        case 3:
            return{
                // AppendBefore
                func: function(msg,str,char){
                    if(msg.length !== 0){           
                        for(var j = -1; j++; j<msg.length){
                            if(msg[j].charAt(0) == char){break;}
                        }
                        msg.splice(j,0,str);
                    }
                    else{
                        msg = [str];
                    }
                }
            }

        case 4:
            return{
                // Reverse
                func: function(msg,string,char){
                    msg.reverse();
                }
            }
        default:
            console.log('error');

    }

}

//////////////////////////////////////////////////////
// Console Communication
//////////////////////////////////////////////////////

var readlinesync = require('readline-sync');
var count = readlinesync.question('Please input maximum number: ');

var divisor = [];
var rule = [];
var string = [];
var chars = [];

console.log('Available rules: \n 1. Append string at the end. \n 2. Overwrite previous strings. \n 3. Append string before first string starting with specified letter or at the end. \n 4. Reverse order of previous strings.');
while(true){

    // Request a divisor
    let d = readlinesync.question('Divisor = ');
    if(d == ''){
        break;
    }else{
        divisor.push(d);
    }

    // Request a rule
    {
        let valid = false;
        while(!valid){
            let n = readlinesync.question('Rule number: ');

            var rule1 = getRule(1);
            var rule2 = getRule(2);
            var rule3 = getRule(3);
            var rule4 = getRule(4);

            switch(+n){

                case 1:
                    rule.push(rule1);

                    // Request a string
                    string.push(readlinesync.question('String: '))
                    // Add empty char
                    chars.push('');

                    valid = true;
                    break;

                case 2:
                    rule.push(rule2);

                    // Request a string
                    string.push(readlinesync.question('String: '))
                    // Add empty char
                    chars.push('');
                    valid = true;
                    break;

                case 3:
                    rule.push(rule3);

                    // Request a string
                    string.push(readlinesync.question('String: '))
                    // Request a char
                    chars.push(readlinesync.question('Letter to append before = '));

                    valid = true;
                    break;

                case 4:
                    rule.push(rule4);

                    // Add empty string
                    string.push('');
                    // Add empty char
                    chars.push('');

                    valid = true;
                    break;

                default:
                    console.log('Invalid rule number');
            }
        }
    }

}

//////////////////////////////////////////////////////
// Rule implementation
//////////////////////////////////////////////////////

for(var i = 1; i <= count; i++){

    var msg;
    msg = [];

    for(let j = 0; j<divisor.length; j++){
        if(i%divisor[j] === 0){
            rule[j].func(msg,string[j],chars[j]);
        }

    }

    if(msg.length == 0){
        console.log(i);
    }
    else{
        console.log(msg.join(''));
    }

}