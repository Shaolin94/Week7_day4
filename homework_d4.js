// Exercise 1
/*
Banking System

[x]Create an Account class with the properties accountNumber, currentBalance, and owner.
[x]The Account should have methods to deposit and withdraw.
[x]The deposit method should add that amount to the currentBalance.
[x]The withdraw method should first check if there is enough to withdraw before withdrawing

[x]Implement child classes CheckingAccount and SavingsAccount, each inheriting from the Account class. 
[x]The CheckingAccount will also have an overdraftLimit property. 
[x]Override the withdraw method to first check if there is enough (+ overdraftLimit) before withdrawing.

[x]The SavingsAccount will also have an interestRate.
[x]Add a method addInterest that will increase the currentBalance by that interest rate

*/

class Account {
    constructor(accountNumber, currentBalance, owner) {
        this.accountNumber = accountNumber;
        this.currentBalance = currentBalance;
        this.owner = owner;
    }

    deposit(amount) {
        if (amount > 0) {
            this.currentBalance += amount;
            console.log(`${this.owner} deposited $${amount} into account ${this.accountNumber}.`);
        } else {
            console.log("Invalid deposit amount");
        }
    }

    withdraw(amount) {
        if (amount > 0) {
            if (amount <= this.currentBalance) {
                this.currentBalance -= amount;
                console.log(`${this.owner} withdrew $${amount} from account ${this.accountNumber}.`);
            } else {
                console.log(`Transaction on ${this.owner}'s checking account #${this.accountNumber} to withdraw $${amount} canceled due to insufficient funds`);
            }
        } else {
            console.log("Transaction canceled due to invalid withdrawal amount.");
        }
    }
}

class CheckingAccount extends Account {
    constructor(accountNumber, currentBalance, owner, overdraftLimit) {
        super(accountNumber, currentBalance, owner);
        this.overdraftLimit = overdraftLimit;
    }

    withdraw(amount) {
        if (amount > 0) {
            if ((this.currentBalance + this.overdraftLimit) >= amount) {
                this.currentBalance -= amount;
                console.log(`${this.owner} withdrew $${amount} from checking account ${this.accountNumber}.`);
            } else {
                console.log(`Transaction on ${this.owner}'s checking account #${this.accountNumber} to withdraw $${amount} canceled due to exceeding overdraft limit ($${this.overdraftLimit}).`);
            }
        } else {
            console.log("Transaction on ${this.owner}'s checking account #${this.accountNumber}, canceled due to invalid withdrawal amount.");
        }
    }
}

class SavingsAccount extends Account {
    constructor(accountNumber, currentBalance, owner, interestRate) {
        super(accountNumber, currentBalance, owner);
        this.interestRate = interestRate;
    }

    addInterest() {
        const interestAmount = this.currentBalance * (this.interestRate / 100);
        this.currentBalance += interestAmount;
        console.log(`$${interestAmount} interest added to savings account ${this.accountNumber} for ${this.owner}.`);
    }
}

//Demo Samples

const checkingAccount = new CheckingAccount('123456', 1000, 'John Doe', 500);
const savingsAccount = new SavingsAccount('654321', 5000, 'Jane Smith', 2);

checkingAccount.deposit(500);
checkingAccount.withdraw(1400);
checkingAccount.withdraw(200); 
console.log(`Checking Current Balance: $`,checkingAccount.currentBalance);

savingsAccount.deposit(1000);
savingsAccount.withdraw(7000);
savingsAccount.addInterest();
console.log(`Savings Current Balance: $`,savingsAccount.currentBalance);


// Exercise 2 - Promises 
// Using the below getMovieInfo function, which is a Promised-base function, write an asynchronous function (.then().catch() or async/await)
// called printMovieInfo that will take in a movie title and then either displays the movie information or logs an error with a console.warn().


function getMovieInfo(movieName){
    return new Promise((resolve, reject) => {
        if (movieName.length > 5){
            let movie = {
                id: 123,
                title: movieName,
                director: 'Christopher Spielberg',
                runtime: 157,
                description: 'Good vs Evil'
            }
            resolve(movie)
        } else {
            reject(`${movieName} cannot be accessed because it is too short.`)
        }
    })
}

function printMovieInfo(movieTitle) {
    getMovieInfo(movieTitle)
        .then(movieInfo => {
            console.log(`${movieTitle} directed by ${movieInfo.director}. A story of ${movieInfo.description} that runs for ${movieInfo.runtime} minutes.`);
        })
        .catch(error => {
            console.warn("Error:", error);
        })
        .finally(() => {
            console.log("Thank you for searching our database");
        });
}

// Example 1
printMovieInfo('Indiana Jones and the Dark Knight')
// Output: Indiana Jones and the Dark Knight directed by Christopher Spielberg. A story of Good vs Evil that runs for 157 minutes.

// Example 2
printMovieInfo('ET')
// Output: *Warning* ET cannot be accessed because it it too short




// Exercise 3
// Add a Button somewhere on your index.html page with an id "backgroundChanger"
// Add a click event listener to your button that will change the background color of the body
// The background should toggle between at least 2 colors