import Alert from '../Alert.js';

class OrderAlert extends Alert {
    display() {
        console.log(`Order Alert: ${this.message}`);
        return true;
    }
}

export default OrderAlert;