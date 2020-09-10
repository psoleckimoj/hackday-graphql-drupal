class Establishment {
    constructor(establishmentData) {
        this.establishmentId = establishmentData.id;
        this.establishmentName = establishmentData.name;
    }

    id() {
        return this.establishmentId;
    }

    name() {
        return this.establishmentName;
    }
}

module.exports = {
    Establishment,
};
