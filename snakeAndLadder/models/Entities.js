// models/Entities.js
class Entities {
    constructor() {
        if (!Entities.instance) {
            this.snakes = new Map();
            this.ladders = new Map();
            this.players = new Map();
            Entities.instance = this;
        }

        return Entities.instance;
    }

    setSnake(startPosition, endPosition) {
        this.snakes.set(startPosition, endPosition);
    }

    get getSnakes() {
        return this.snakes;
    }

    setLadder(startPosition, endPosition) {
        this.ladders.set(startPosition, endPosition);
    }

    get getLadders() {
        return this.ladders;
    }

    setPlayer(index, playerName) {
        this.players.set(index, playerName);
    }

    get getPlayers() {
        return this.players;
    }
}

const instance = new Entities();
Object.freeze(instance);

module.exports = instance;
