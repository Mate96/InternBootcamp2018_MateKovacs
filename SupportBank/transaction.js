var a = require('./account');

module.exports.Transaction = function Transaction(otherAccount,amount,date,narrative){
    this.otherAccount = otherAccount;
    this.amount = amount;
    this.date = date;
    this.narrative = narrative;
    this.isProcessed = false;
}