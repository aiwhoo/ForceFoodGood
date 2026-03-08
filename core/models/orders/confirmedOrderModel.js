import OrderModel from "./orderModel.js";
import CartOrderModel from "./cartOrderModel.js";

class ConfirmedOrderModel extends CartOrderModel {
    constructor(paymentID, userAddress){
        super();
        this.paymentID = paymentID;
        this.userAddress = userAddress;
    }

}