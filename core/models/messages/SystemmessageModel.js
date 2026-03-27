import Message from "./messageModel.js";

class SystemMessage extends Message {
    constructor(content, recipient, severity) {
        super(content, recipient);
        this.severity = severity;
    }
    formatMessage() {
        return `[SYSTEM ${this.severity}] ${this.content}`;
    }
}

export default SystemMessage;
