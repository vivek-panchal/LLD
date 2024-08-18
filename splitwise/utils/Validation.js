class Validation {
    static validatePercent(percentages) {
        const total = percentages.reduce((sum, p) => sum + p, 0);
        return total === 100;
    }

    static validateExact(totalAmount, amounts) {
        const total = amounts.reduce((sum, amount) => sum + amount, 0);
        return totalAmount === total;
    }
}

module.exports = Validation;
