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
        
    }
}
export default AuthProvider


