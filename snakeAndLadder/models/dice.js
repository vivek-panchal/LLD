// models/Dice.js
class Dice {
    constructor(numberOfDice) {
        this.numberOfDice = numberOfDice;
        this.MIN = 1;
    }

    get numberOfDiceValue() {
        return Math.floor(Math.random() * this.numberOfDice) + this.MIN;
    }
}

module.exports = Dice;
