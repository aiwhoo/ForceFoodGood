import AuthProvider from "./AuthProvider.js"
class OAuthProvider extends AuthProvider {
    constructor() {
        super()
    }
    fetchAccount(info) {
        const token = info.token
        const user = this.userData.find(u => u.token == token)
        if (!user) {
            console.log(info)
            return false;
        }
        super.login(user)
       
        return true
    }
}
export default OAuthProvider