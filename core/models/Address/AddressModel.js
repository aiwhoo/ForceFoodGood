// AddressModel.js
class AddressModel {
    constructor(street, city, state, zip) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    // Base validation method to be overridden
    validate() {
        return this.street !== "" && this.city !== "" && this.state !== "" && this.zip !== "";
    }

    // Base formatting method to be overridden
    format() {
        return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    }
}

export default AddressModel;