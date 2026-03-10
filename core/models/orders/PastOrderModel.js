import OrderModel from "./OrderModel.js";

class PastOrderModel extends OrderModel {
    constructor(base, deliveryDate){
        super(base.username, base.restaurant, base.id);
        this.deliveryDate = deliveryDate;
    }
    get getDeliveryDate() {
        return this.deliveryDate;
    }
}
export default PastOrderModel;