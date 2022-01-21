class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let exchange of this.transactions) {
      balance += exchange.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -Math.abs(this.amount);
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account ('Snow-Patrol');
console.log('Starting Balace: ', myAccount.balance);
console.log('Attepming to withdraw even $1 should fail...');
const t1 = new Withdrawal(1, myAccount);
console.log('commit result: ',t1.commit());
console.log('Account balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('commit result: ',t2.commit());
console.log('Account balance: ', myAccount.balance);

console.log('Attepming to withdraw $9.99 should pass...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('commit result: ',t3.commit());

console.log('Ending Account balance: ', myAccount.balance);


console.log('Account tranaction history', myAccount.transactions);

// console.log('Transaction 3:', t3);
