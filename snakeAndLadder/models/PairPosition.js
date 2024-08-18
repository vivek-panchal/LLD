// models/PairPosition.js
class PairPosition {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    get getStart() {
        return this.start;
    }

    get getEnd() {
        return this.end;
    }
}

module.exports = PairPosition;
