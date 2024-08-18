class User {
    constructor(userId, name, email, mobileNumber) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.balanceSheet = {};  // userId -> balance
    }

    updateBalanceSheet(userId, amount) {
        if (!this.balanceSheet[userId]) {
            this.balanceSheet[userId] = 0;
        }
        this.balanceSheet[userId] += amount;
    }

    getBalances() {
        return this.balanceSheet;
    }
}

module.exports = User;
