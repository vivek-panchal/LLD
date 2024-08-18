// services/PlaySnakeAndLadder.js
const Dice = require('../models/Dice');
const Entities = require('../models/Entities');
const PairPosition = require('../models/PairPosition');

class PlaySnakeAndLadder {
    constructor(N) {
        this.playerHistory = new Map();
        this.playerLatestPosition = new Map();
        this.entities = Entities;
        this.dice = new Dice(N);
    }

    playGame() {
        this.initializePlayersStartValue();
        let i = -1;
        let winner = null;

        while (!winner) {
            i++; 
            if (i >= this.entities.getPlayers.size) {
                i = 0;
            }

            const playerName = Array.from(this.entities.getPlayers.values())[i];
            let diceNumber = this.dice.numberOfDiceValue;
            let endPosition = this.playerLatestPosition.get(playerName) + diceNumber;
            let status = '';

            if (this.isValidPosition(endPosition)) {
                if (this.entities.getSnakes.has(endPosition)) {
                    endPosition = this.entities.getSnakes.get(endPosition);
                    status = ' after Snake bite';
                } else if (this.entities.getLadders.has(endPosition)) {
                    endPosition = this.entities.getLadders.get(endPosition);
                    status = ' after Ladder climb';
                }

                this.playerLatestPosition.set(playerName, endPosition);
                console.log(`${playerName} rolled a ${diceNumber} and moved from ${this.playerLatestPosition.get(playerName)} to ${endPosition}${status}`);

                if (this.hasPlayerWon(playerName)) {
                    winner = playerName;
                }
            }
        }

        return winner;
    }

    hasPlayerWon(player) {
        return this.playerLatestPosition.get(player) === 100;
    }

    isValidPosition(position) {
        return position <= 100;
    }

    initializePlayersStartValue() {
        for (let playerName of this.entities.getPlayers.values()) {
            this.playerLatestPosition.set(playerName, 0);
        }
    }
}

module.exports = PlaySnakeAndLadder;
