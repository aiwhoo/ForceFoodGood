import OrderModel from "./OrderModel.js";

class ConfirmedOrderModel extends OrderModel {
    constructor(base, paymentID, userAddress){
        super(base.username, base.restaurant, base.id);
        this.paymentID = paymentID;
        this.userAddress = userAddress;
        this.timeOfOrder = new Date().toISOString();
        this.status = null;
    }
    getPaymentID() {
        return this.paymentID;
    }
    getUserAddress() {
        return this.userAddress;
    }
    getStatus(){
        return this.status;
    }
    updateStatus(newStatus) {
        this.status = newStatus;
    }



}
export default ConfirmedOrderModel;