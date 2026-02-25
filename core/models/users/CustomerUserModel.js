class CustomerUserModel extends UserModel {
    placeOrder(orderID){
        return "Order " + orderID + " was placed by " + this.firstName + " " + this.lastName;
    }
}