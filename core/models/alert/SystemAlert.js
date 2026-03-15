import Alert from '../Alert.js';

class SystemAlert extends Alert {
    display() {
        console.log(`System Alert: ${this.message}`);
        return `💻 System Alert: ${this.message}`;
    }
}

export default SystemAlert;