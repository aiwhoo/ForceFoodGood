import Alert from '../Alert.js';

class SystemAlert extends Alert {
    display() {
        console.log(`System Alert: ${this.message}`);
        return true;
    }
}

export default SystemAlert;