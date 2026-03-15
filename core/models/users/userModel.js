class UserModel {
    constructor(id, firstName = "", lastName = "", email = "", password="", token="") {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isLoggedIn = false;
        this.password = password
        this.token = token
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
    hasPassword() {
        return this.password != ""
    }
    hasToken() {
        return this.token != ""
    }
    getEmail() {
        return this.email;
    }
    login(user_email, user_password){
        this.isLoggedIn = (user_email == this.email && user_password == this.password);
        return this.isLoggedIn;
    }
    logout(){
        this.isLoggedIn = false;
    }
    getContactInformation(){
        return [this.firstName, this.lastName, this.email, this.isLoggedIn];
    }
}
export default UserModel;