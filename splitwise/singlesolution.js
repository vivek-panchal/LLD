class User {
    constructor(userId, name, email, mobileNumber) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
    }
}

class BalanceManager {
    constructor() {
        this.balances = new Map(); // Stores balances in format Map<UserId, Map<UserId, Amount>>
    }

    addBalance(userFrom, userTo, amount) {
        if (!this.balances.has(userFrom)) {
            this.balances.set(userFrom, new Map());
        }
        const userBalanceMap = this.balances.get(userFrom);
        userBalanceMap.set(userTo, (userBalanceMap.get(userTo) || 0) + amount);
    }

    getBalancesForUser(userId) {
        const balances = [];
        if (this.balances.has(userId)) {
            for (const [userTo, amount] of this.balances.get(userId)) {
                balances.push(`${userId} owes ${userTo}: ${amount.toFixed(2)}`);
            }
        }
        for (const [userFrom, userBalanceMap] of this.balances.entries()) {
            if (userBalanceMap.has(userId)) {
                balances.push(`${userId} is owed by ${userFrom}: ${userBalanceMap.get(userId).toFixed(2)}`);
            }
        }
        return balances.length ? balances : ['No balances'];
    }

    getAllBalances() {
        const balances = [];
        for (const [userFrom, userBalanceMap] of this.balances.entries()) {
            for (const [userTo, amount] of userBalanceMap.entries()) {
                if (amount !== 0) {
                    balances.push(`${userTo} owes ${userFrom}: ${amount.toFixed(2)}`);
                }
            }
        }
        return balances.length ? balances : ['No balances'];
    }
}

class ExpenseManager {
    constructor() {
        this.balanceManager = new BalanceManager();
    }

    addExpense(payer, amount, users, type, values) {
        switch (type) {
            case 'EQUAL':
                this.splitEqual(payer, amount, users);
                break;
            case 'EXACT':
                this.splitExact(payer, amount, users, values);
                break;
            case 'PERCENT':
                this.splitPercent(payer, amount, users, values);
                break;
        }
    }

    splitEqual(payer, amount, users) {
        const share = parseFloat((amount / users.length).toFixed(2));
        let totalAssigned = 0;

        users.forEach((user, index) => {
            const userShare = (index === users.length - 1) ? (amount - totalAssigned) : share;
            if (user !== payer) {
                this.balanceManager.addBalance(payer, user, userShare);
            }
            totalAssigned += userShare;
        });
    }

    splitExact(payer, amount, users, values) {
        const total = values.reduce((sum, value) => sum + value, 0);
        if (total !== amount) {
            throw new Error('Exact amounts do not sum up to total amount.');
        }

        users.forEach((user, index) => {
            if (user !== payer) {
                this.balanceManager.addBalance(payer, user, values[index]);
            }
        });
    }

    splitPercent(payer, amount, users, percentages) {
        const totalPercent = percentages.reduce((sum, percent) => sum + percent, 0);
        if (totalPercent !== 100) {
            throw new Error('Percentages do not sum up to 100.');
        }

        users.forEach((user, index) => {
            const share = parseFloat(((percentages[index] / 100) * amount).toFixed(2));
            if (user !== payer) {
                this.balanceManager.addBalance(payer, user, share);
            }
        });
    }

    showBalance(userId = null) {
        if (userId) {
            return this.balanceManager.getBalancesForUser(userId);
        } else {
            return this.balanceManager.getAllBalances();
        }
    }
}

// Usage Example
const users = [
    new User('u1', 'User1', 'user1@example.com', '1234567890'),
    new User('u2', 'User2', 'user2@example.com', '2345678901'),
    new User('u3', 'User3', 'user3@example.com', '3456789012'),
    new User('u4', 'User4', 'user4@example.com', '4567890123')
];

const expenseManager = new ExpenseManager();

console.log(expenseManager.showBalance()); // No balances

expenseManager.addExpense('u1', 1000, ['u1', 'u2', 'u3', 'u4'], 'EQUAL');
console.log(expenseManager.showBalance('u4')); // User4 owes User1: 250
console.log(expenseManager.showBalance('u1')); // User2 owes User1: 250, User3 owes User1: 250, User4 owes User1: 250

expenseManager.addExpense('u1', 1250, ['u2', 'u3'], 'EXACT', [370, 880]);
console.log(expenseManager.showBalance()); // User2 owes User1: 620, User3 owes User1: 1130, User4 owes User1: 250

expenseManager.addExpense('u4', 1200, ['u1', 'u2', 'u3', 'u4'], 'PERCENT', [40, 20, 20, 20]);
console.log(expenseManager.showBalance('u1')); // User1 owes User4: 230, User2 owes User1: 620, User3 owes User1: 1130
console.log(expenseManager.showBalance()); // Shows all balances
