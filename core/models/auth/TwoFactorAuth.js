import AuthProvider from "./AuthProvider.js"
class TwoFactorAuth extends AuthProvider {
    fetchAccount(info) {
        const email = info.email
        //find user with the specified email
        const user = this.userData.find(u => u.email == email)
        if (!user) {
            console.log(info)
            return false;
        }
        //ensure passwords match and account isn't token-based
        if (user.password == info.password && user.hasPassword()) {
            super.login(user)
            return true
        }
        return false
    }
}
export default TwoFactorAuth