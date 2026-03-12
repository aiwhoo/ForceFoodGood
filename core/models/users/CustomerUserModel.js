class CustomerUserModel extends UserModel {
    placeOrder(orderID){
        return "Order " + orderID + " was placed by " + this.firstName + " " + this.lastName;
    }
    login(userEmail){
        let parentLogin = super.login(userEmail);
        console.log("Customer loggin in");
        return parentLogin;
    }
}

export default CustomerUserModel;