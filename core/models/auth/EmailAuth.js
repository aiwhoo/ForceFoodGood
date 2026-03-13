import AuthProvider from "./AuthProvider.js"
class EmailAuth extends AuthProvider {
    fetchAccount(info) {
        const email = info.email
        //find user with the specified email
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