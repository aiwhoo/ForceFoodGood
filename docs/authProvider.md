# AuthProvider parent class
Loads userData to all subclasses through super(). Provides an empty fetchAccount() method to be implemented by all subclasses. Provides login(userModel) function to all subclasses to allow logging in users after credentials are checked
# EmailAuth
overloads fetchAccount() to allow users to login via email only
fetchAccount({
    email: string
})
# TwoFactorAuth
overloads fetchAccount() to allow users to login via email and password
fetchAccount({
    email: string,
    password: string
})
# OAuthProvider
overloads fetchAccount() to allow users to login via token
fetchAccount({
    token: string
})