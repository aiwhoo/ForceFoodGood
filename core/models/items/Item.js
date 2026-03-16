class Item {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    validate() {
        if (!this.name || typeof this.name !== 'string' || this.name.trim() === '') return false;
        if (this.price === undefined || typeof this.price !== 'number' || this.price < 0) return false;
        if (typeof this.description !== 'string') return false;
        return true;
    }
}
export default Item;