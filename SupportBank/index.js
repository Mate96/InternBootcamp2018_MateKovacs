var Papa = require('papaparse');
var _ = require('lodash');
var readlinesync = require('readline-sync');
var fs = require('fs')

function Account(name){
    this.name = name;
    this.balance = 0;
    // Amount positive if transfered from this account
    this.transfer = function(amount){
        this.balance -= amount;
        this.balance = this.balance.toFixed(2);
    }
}

function Transaction(from,to,amount,date,narrative){
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.date = date;
    this.narrative = narrative;
}

function ProcessTransaction(transaction){

    CreateAccountIfMissing(transaction.from);
    CreateAccountIfMissing(transaction.to);

    let fromAccount = _.filter(accounts,['name', transaction.from])[0];
    let toAccount = _.filter(accounts,['name', transaction.to])[0];

    fromAccount.transfer(transaction.amount);
    toAccount.transfer(-transaction.amount);

}

function CreateAccountIfMissing(accountname){
    if( _.filter(accounts,['name', accountname]).length === 0 ) {
        accounts.push(new Account(accountname));
    }
}

function listTransactions(accountname){
    console.log('\nOutgoing transactions: \n');
    for(let i = 0; i<history.length; i++){
        if(history[i].from === accountname){
            console.log(' Date: ' + history[i].date + '\n To: ' + history[i].to + '\n Amount: ' + history[i].amount + '\n Narrative: ' + history[i].narrative + '\n');
        }
    }
                
    console.log('Incoming transactions: \n');
    for(let i = 0; i<history.length; i++){
        if(history[i].to === accountname){
            console.log(' Date: ' + history[i].date + '\n From: ' + history[i].from + '\n Amount: ' + history[i].amount + '\n Narrative: ' + history[i].narrative + '\n');
        }
    }
}

var history = [];   // for storing transactions
var accounts = [];

fs.readFile('./Transactions2014.csv', 'utf8', function (err,data) {

  if (err) {
    return console.log(err);
  }

  // Decode data
  var info = Papa.parse(data);

  // Make all Transaction objects from decoded data
  for(let i = 1; i < info.data.length; i++){

      let date = info.data[i][0];
      let from = info.data[i][1];
      let to = info.data[i][2];
      let narrative = info.data[i][3];
      let amount = info.data[i][4];

      if(from !== undefined && to !== undefined && amount !== undefined){
          history.push(new Transaction(from,to,amount,date,narrative));
      }

  }

  for(let i = 0; i<history.length; i++){
      ProcessTransaction(history[i]);
  }

  var command;
  console.log('Available commands: \n 1. List All \n 2. List [Account] \n 3. Exit')
  while(command !== 'exit'){

      command = readlinesync.question('Please input command: ');

      if(command === 'List All'){

          for(let i = 0; i < accounts.length; i++){
              console.log(accounts[i].name + ': ' + accounts[i].balance);
          }

      }else if(command.substring(0,6) === 'List [' && command.charAt(command.length-1) === ']'){
          
          let account = command.substring(6,command.length-1);
          listTransactions(account);

      }else if(command !== 'exit'){
          console.log('Invalid command');
      }

    }

});