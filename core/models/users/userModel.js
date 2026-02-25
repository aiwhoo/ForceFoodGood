class UserModel {
    constructor(id, firstName = "", lastName = "", email = "") {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isLoggedIn = false;
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
    login(user_email){
        this.isLoggedIn = user_email == this.email;
        return this.isLoggedIn;
    }
    logout(){
        this.isLoggedIn = false;
    }
    getContactInformation(){
        return [this.firstName, this.lastName, this.email, this.isLoggedIn];
    }
}