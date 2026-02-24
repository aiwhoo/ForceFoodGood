class Cart {
    constructor() {
        this.items = [];
    }

    addItem(name, price, quantity = 1) {
        const existingItem = this.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, price, quantity });
        }
    }

    calculateTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.quantity;
        }
        return total.toFixed(2);
    }

    checkout() {
        this.items = [];
    }
}

export default Cart;
