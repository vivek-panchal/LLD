class UserService {
    constructor() {
        this.users = {};
    }

    addUser(user) {
        this.users[user.userId] = user;
    }

    getUser(userId) {
        return this.users[userId];
    }

    showBalances(userId) {
        const user = this.getUser(userId);
        const balances = user.getBalances();
        const result = [];
        for (const [otherUserId, amount] of Object.entries(balances)) {
            if (amount !== 0) {
                if (amount > 0) {
                    result.push(`${otherUserId} owes ${userId}: ${amount.toFixed(2)}`);
                } else {
                    result.push(`${userId} owes ${otherUserId}: ${(-amount).toFixed(2)}`);
                }
            }
        }
        return result.length ? result.join('\n') : 'No balances';
    }

    showAllBalances() {
        const results = [];
        for (const userId in this.users) {
            const balances = this.showBalances(userId);
            if (balances !== 'No balances') {
                results.push(balances);
            }
        }
        return results.length ? results.join('\n') : 'No balances';
    }
}

module.exports = UserService;
