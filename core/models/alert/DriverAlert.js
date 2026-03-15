import Alert from '../Alert.js';

class DriverAlert extends Alert {
    display() {
        console.log(`Driver Alert: ${this.message}`);
        return `🚚 Driver Alert: ${this.message}`;
    }
}

export default DriverAlert;