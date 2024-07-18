import inquirer from "inquirer";
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Bank Account Class:
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining Balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    // Creadit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // 1$ fee charged if more then 100$ is deposited
        }
        this.balance = +amount;
        console.log(`Deposit of $${amount} successfull. Remaining balance: $${this.balance}`);
    }
    // Check Balance
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
}
// Create Bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Create Customers
const customers = [
    new Customer("Hamza", "Syed", "Male", 35, 3162223334, accounts[0]),
    new Customer("Mubashir", "Khan", "Male", 16, 3462223334, accounts[1]),
    new Customer("Ali", "Raza", "Male", 19, 3262223334, accounts[2])
];
// Function to interect with bank account
let service = async () => {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                message: "Enter your account number:",
                type: "number",
            },
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            message: "Enter the amount which you want to deposit",
                            type: "number",
                        },
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            message: "Enter the amount which you want to withdraw",
                            type: "number",
                        },
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program");
                    console.log("Thank For using our bank services😊. Have a great day");
                    return;
            }
        }
        else {
            console.log("Invalid account number☹. Please try again.👍");
        }
    } while (true);
};
service();
