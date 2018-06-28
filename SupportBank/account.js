//var t = require('./transaction');

function Account(name){
    this.name = name;
    this.balance = 0;
    this.transactionHistory = {};
    // Amount positive if transfered from this account
    this.transfer = function(amount){
        this.balance -= amount;
        this.balance = this.balance.toFixed(2);
    }
    this.processTransaction = function(id){
        if(!this.transactionHistory[id].processed){
            this.transfer(this.transactionHistory[id].amount)
            this.transactionHistory[id].processed = true;
        }
    }
    this.listTransactions = function(){
        for(let transaction in this.transactionHistory){
            console.log(' Date: ' + transaction.date + '\n To: ' + transaction.otherAccount + '\n Amount: ' + transaction.amount + '\n Narrative: ' + transaction.narrative + '\n');
        }
    }
}

module.exports.CreateAccountIfMissing = function CreateAccountIfMissing(accountname,accounts){
    if(!accounts[accountname]) {
        accounts[accountname] = new Account(accountname);
    }
    return accounts;
}