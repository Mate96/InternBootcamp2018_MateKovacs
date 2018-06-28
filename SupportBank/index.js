let Papa = require('papaparse');
let _ = require('lodash');
let readlinesync = require('readline-sync');
let fs = require('fs')
let log4js = require('log4js');
let Transaction = require('./transaction').Transaction;
let accountLib = require('./account');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

var accounts = {};

fs.readFile('./Transactions2014.csv', 'utf8', function (err,data) {

  if (err) {
    return console.log(err);
  }

  // Decode data
  var info = Papa.parse(data);

  var id = 0; // Keep track of the next available transaction id

  // Make all Transaction objects from decoded data
  for(let i = 1; i < info.data.length; i++){

      let date = info.data[i][0];
      let from = info.data[i][1];
      let to = info.data[i][2];
      let narrative = info.data[i][3];
      let amount = info.data[i][4];

      if(from && to && amount){
          if(typeof +amount === 'number'){

            accounts = accountLib.CreateAccountIfMissing(from,accounts);
            accounts = accountLib.CreateAccountIfMissing(to,accounts);

            accounts[from].transactionHistory[id] = new Transaction(to,amount,date,narrative);
            accounts[to].transactionHistory[id] = new Transaction(from,-amount,date,narrative);
            id++;

            accounts[from].ProcessTransaction(id);
            accounts[to].ProcessTransaction(id);
          } else{
              console.log('Invalid amount in line ' + (i+1));
          }
      }
      else{
          console.log('Line ' + (i+1) + ' could not be processed.');
      }

  }


  var command;
  console.log('Available commands: \n 1. List All \n 2. List [Account] \n 3. Exit')
  while(command !== 'exit'){

      command = readlinesync.question('Please input command: ');

      if(command === 'List All'){
          for(let account in accounts){
              console.log(account.name + ': ' + account.balance);
          }
      }else if(command.substring(0,6) === 'List [' && command.charAt(command.length-1) === ']'){         
          let account = command.substring(6,command.length-1);
          accounts[account].listTransactions();
      }else if(command !== 'exit'){
          console.log('Invalid command');
      }

    }

});