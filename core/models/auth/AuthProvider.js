import UserData from "../sample-data/users.js"

class AuthProvider {
    constructor() {
        //load user data
        this.userData = UserData
    }
    login(user) {
        user.login()
    }

    fetchAccount() {
        console.log("implement in subclasses")
        return false;
    }
}
export default AuthProvider


