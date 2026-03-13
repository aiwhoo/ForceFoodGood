import { expect } from 'chai';
import AuthProvider from "../core/models/auth/AuthProvider.js";
import EmailAuth from "../core/models/auth/EmailAuth.js";
import OAuthProvider from "../core/models/auth/OAuthProvider.js";
import TwoFactorAuth from "../core/models/auth/TwoFactorAuth.js";

describe("AuthProvider Instantiation", () => {

    const authProvider = new AuthProvider()

    it("User Data should be loaded", () => {
        expect(authProvider.userData).to.not.be.undefined;
    });
    it("Trying to authenticate with AuthProvider should fail", () => {
        expect(authProvider.fetchAccount()).to.equal(false);
    });

});
describe("EmailAuth Instantiation", () => {

    const authProvider = new EmailAuth()

    it("Correct credentials are logged in", () => {
        expect(authProvider.fetchAccount({email: "dsafro@gmail.com"})).to.equal(true);
        expect(authProvider.fetchAccount({email: "mattsap@gmail.com"})).to.equal(false);
    });

});
describe("TwoFactorAuth Instantiation", () => {

    const authProvider = new TwoFactorAuth()

    it("Correct credentials are logged in", () => {
        expect(authProvider.fetchAccount({email: "dsafro@gmail.com", password: "hello52"})).to.equal(true);
        expect(authProvider.fetchAccount({email: "dsafro@gmail.com", password: "hello53"})).to.equal(false);
    });
    it("Accounts without password fail", () => {
        expect(authProvider.fetchAccount({email: "kfu@gmail.com", password: "hello53"})).to.equal(false);
    });
});
describe("OAuth Instantiation", () => {

    const authProvider = new OAuthProvider()

    it("Correct credentials are logged in", () => {
        expect(authProvider.fetchAccount({token:"favid"})).to.equal(true);
        expect(authProvider.fetchAccount({token: "jeremy"})).to.equal(false);
    });
    it("Invalid data inputted", () => {
        expect(authProvider.fetchAccount({email: "kfu@gmail.com", password: "hello53"})).to.equal(false);
    });
});