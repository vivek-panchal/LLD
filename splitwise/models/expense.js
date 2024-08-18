class Expense {
    constructor(paidBy, amount, involvedUsers, type, values = []) {
        this.paidBy = paidBy;
        this.amount = amount;
        this.involvedUsers = involvedUsers;
        this.type = type;
        this.values = values;  // For EXACT or PERCENT values
    }
}

module.exports = Expense;
