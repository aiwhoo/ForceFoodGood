import UserData from "../sample-data/users.js"

class AuthProvider {
    constructor() {
        this.userData = UserData
    }
    login(user) {
        user.login()
    }
    userData = UserData.data
    fetchAccount() {
        console.log("implement in subclasses")
        return false;
    }
}
export default AuthProvider


