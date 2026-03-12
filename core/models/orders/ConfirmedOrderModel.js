import OrderModel from "./OrderModel.js";

class ConfirmedOrderModel extends OrderModel {
    constructor(base, paymentID, userAddress){
        super(base.username, base.restaurant, base.id);


        this.itemsOrdered = base.itemsOrdered;
        this.totalCost = base.totalCost;
        this.subtotal = base.subtotal;
        this.taxTotal = base.taxTotal;

        this.paymentID = paymentID;
        this.userAddress = userAddress;
        this.lastModified = new Date().toISOString();
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
    summary() {
        return super.summary()+`\n[CONFIRMED] Status: ${this.status} - Delivering to ${this.userAddress}`;
    }



}
export default ConfirmedOrderModel;