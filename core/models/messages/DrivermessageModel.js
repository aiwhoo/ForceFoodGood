import Message from "./messageModel.js";

class DriverMessage extends Message {
    constructor(content, recipient, driverName) {
        super(content, recipient);
        this.driverName = driverName;
    }
    formatMessage() {
        return `Driver ${this.driverName}: ${this.content}`;
    }
}

export default DriverMessage;
