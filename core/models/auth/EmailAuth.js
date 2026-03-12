import AuthProvider from "./AuthProvider.js"
class EmailAuth extends AuthProvider {
    constructor() {
        super()
    }
    fetchAccount(info) {
        const email = info.email
        const user = this.userData.find(u => u.email == email)
        if (!user) {
            console.log(info)
            return false;
        }
        if (user != null) {
            super.login(user)
            return true
        }
        return false
    }
}
export default EmailAuth