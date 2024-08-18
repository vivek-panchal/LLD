class InputHandler {
    constructor(userService, expenseService) {
        this.userService = userService;
        this.expenseService = expenseService;
    }

    handleInput(input) {
        const parts = input.trim().split(' ');
        const command = parts[0];

        switch (command) {
            case 'EXPENSE':
                this.handleExpense(parts);
                break;
            case 'SHOW':
                if (parts.length === 1) {
                    console.log(this.userService.showAllBalances());
                } else if (parts.length === 2) {
                    console.log(this.userService.showBalances(parts[1]));
                }
                break;
            default:
                console.log('Invalid command');
        }
    }

    handleExpense(parts) {
        const paidBy = parts[1];
        const amount = parseFloat(parts[2]);
        const numberOfUsers = parseInt(parts[3]);
        const involvedUsers = parts.slice(4, 4 + numberOfUsers);
        const expenseType = parts[4 + numberOfUsers];
        const values = parts.slice(5 + numberOfUsers).map(parseFloat);

        const expense = new Expense(paidBy, amount, involvedUsers, expenseType, values);
        this.expenseService.addExpense(expense);
    }
}

module.exports = InputHandler;
