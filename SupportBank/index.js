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

    // Create missing accounts
    if( _.filter(accounts,['name', transaction.from]).length === 0 ) {

        accounts.push(new Account(transaction.from));

    }

    if( _.filter(accounts,['name', transaction.to]).length === 0 ) {

        accounts.push(new Account(transaction.to));

    }

    // Find relevant accounts
    let fromAccount = _.filter(accounts,['name', transaction.from])[0];
    let toAccount = _.filter(accounts,['name', transaction.to])[0];

    // Make transfers
    fromAccount.transfer(transaction.amount);
    toAccount.transfer(transaction.amount);

}

// Initialize variable to record transactions
var history = [];
// Initialize variable to store accounts in
var accounts = [];

// Open and read relevant file
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

  // Process all transactions
  for(let i = 0; i<history.length; i++){
      ProcessTransaction(history[i]);
  }

  // Wait for commands
  var command;
  console.log('Available commands: \n 1. List All \n 2. List [Account] \n 3. Exit')
  while(command !== 'exit'){

      // Ask user for input
      command = readlinesync.question('Please input command: ');

      if(command === 'List All'){
          for(let i = 0; i < accounts.length; i++){
              console.log(accounts[i].name + ': ' + accounts[i].balance);
          }
      }else if(command.substring(0,6) === 'List [' && command.charAt(command.length-1) === ']'){
          
        // String to hold the account name
          let account = command.substring(6,command.length-1);
          console.log(account);

          // Get and display all relevant transactions

            console.log('\nOutgoing transactions: \n');
            for(let i = 0; i<history.length; i++){
                if(history[i].from === account){
                    console.log(' Date: ' + history[i].date + '\n To: ' + history[i].to + '\n Amount: ' + history[i].amount + '\n Narrative: ' + history[i].narrative + '\n');
                }
            }
                
            console.log('Incoming transactions: \n');
            for(let i = 0; i<history.length; i++){
                if(history[i].to === account){
                    console.log(' Date: ' + history[i].date + '\n From: ' + history[i].from + '\n Amount: ' + history[i].amount + '\n Narrative: ' + history[i].narrative + '\n');
                }
            }
      }else if(command !== 'exit'){
          console.log('Invalid command');
      }

    }

});