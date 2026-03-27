import Message from "./messageModel.js";

class OrderMessage extends Message {
    constructor(content, recipient, orderId) {
        super(content, recipient);
        this.orderId = orderId;
    }
    formatMessage() {
        return `Order #${this.orderId}: ${this.content}`;
    }
}

export default OrderMessage;
