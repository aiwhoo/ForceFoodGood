class UserModel {
    constructor(id, firstName = "", lastName = "", email = "") {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    getId() {
        return this.id;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
}