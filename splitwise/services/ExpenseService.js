const Validation = require('../utils/Validation');

class ExpenseService {
    constructor(userService) {
        this.userService = userService;
    }

    addExpense(expense) {
        const { paidBy, amount, involvedUsers, type, values } = expense;
        switch (type) {
            case 'EQUAL':
                this.splitEqually(paidBy, amount, involvedUsers);
                break;
            case 'EXACT':
                if (Validation.validateExact(amount, values)) {
                    this.splitExact(paidBy, involvedUsers, values);
                } else {
                    throw new Error('Invalid exact amounts');
                }
                break;
            case 'PERCENT':
                if (Validation.validatePercent(values)) {
                    this.splitPercent(paidBy, amount, involvedUsers, values);
                } else {
                    throw new Error('Invalid percentage');
                }
                break;
            default:
                throw new Error('Unknown expense type');
        }
    }

    splitEqually(paidBy, amount, involvedUsers) {
        const splitAmount = parseFloat((amount / involvedUsers.length).toFixed(2));
        involvedUsers.forEach(userId => {
            if (userId !== paidBy) {
                this.userService.getUser(userId).updateBalanceSheet(paidBy, splitAmount);
                this.userService.getUser(paidBy).updateBalanceSheet(userId, -splitAmount);
            }
        });
    }

    splitExact(paidBy, involvedUsers, amounts) {
        involvedUsers.forEach((userId, index) => {
            if (userId !== paidBy) {
                const amount = parseFloat(amounts[index].toFixed(2));
                this.userService.getUser(userId).updateBalanceSheet(paidBy, amount);
                this.userService.getUser(paidBy).updateBalanceSheet(userId, -amount);
            }
        });
    }

    splitPercent(paidBy, amount, involvedUsers, percentages) {
        involvedUsers.forEach((userId, index) => {
            if (userId !== paidBy) {
                const userAmount = parseFloat((amount * percentages[index] / 100).toFixed(2));
                this.userService.getUser(userId).updateBalanceSheet(paidBy, userAmount);
                this.userService.getUser(paidBy).updateBalanceSheet(userId, -userAmount);
            }
        });
    }
}

module.exports = ExpenseService;
