class Message {
    constructor(content, recipient) {
        this.content = content;
        this.recipient = recipient;
        this.timestamp = new Date();
    }
    formatMessage() {
        return `[${this.timestamp}] ${this.content}`;
    }
    send() {
        return `Sending message to ${this.recipient}`;
    }
}

export default Message;
