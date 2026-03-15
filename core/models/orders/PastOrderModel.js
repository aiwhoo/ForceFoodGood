import OrderModel from "./OrderModel.js";

class PastOrderModel extends OrderModel {
    constructor(base, deliveryDate){
        super(base.username, base.restaurant, base.id);
        this.deliveryDate = deliveryDate;
        this.status = base.status;
    }
    getDeliveryDate() {
        return this.deliveryDate;
    }
    updateStatus(newStatus) {
        this.status = newStatus;
    }
    getStatus() {
        return this.status;
    }
    summary() {
        return super.summary()+`\n[DELIVERED] Status: ${this.status} - Delivered on ${this.deliveryDate}`;
    }
}
export default PastOrderModel;