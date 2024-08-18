// models/Player.js
class Player {
    constructor(playerName, id) {
        this.playerName = playerName;
        this.id = id;
    }

    get getPlayerName() {
        return this.playerName;
    }

    get getId() {
        return this.id;
    }
}

module.exports = Player;
