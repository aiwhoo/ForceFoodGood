import FileResource from "./fileResourceModel.js";

class OrderFileModel extends FileResource {

    constructor(filename = "order", format = "json") {
        super(filename, format);
    }

    // Serializes an order object (customer, items, total) into a JSON string
    generate(orderData) {
        this.validate(orderData);

        if (!orderData.customer || !Array.isArray(orderData.items) || orderData.items.length === 0) {
            throw new Error("Order data must include a customer and at least one item");
        }

        const output = {
            type: "order",
            generatedAt: new Date().toISOString(),
            customer: orderData.customer,
            items: orderData.items,
            total: orderData.total ?? 0
        };

        return JSON.stringify(output, null, 2);
    }

    // Parses a JSON string back into an order object
    load(raw) {
        this.validate(raw);

        const parsed = JSON.parse(raw);

        if (parsed.type !== "order") {
            throw new Error("File does not contain order data");
        }

        return {
            customer: parsed.customer,
            items: parsed.items,
            total: parsed.total
        };
    }

}

export default OrderFileModel;
