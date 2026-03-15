import { expect } from 'chai';
import FileResource from "../core/models/files/fileResourceModel.js";
import MenuFileModel from "../core/models/files/menuFileModel.js";
import OrderFileModel from "../core/models/files/orderFileModel.js";
import InvoiceFileModel from "../core/models/files/invoiceFileModel.js";

describe("FileResource Hierarchy Tests", function () {

    // ─── Base Class Tests ────────────────────────────────────────────────────

    it("should throw when generate() is called on the base class", function () {
        // The base FileResource class defines generate() as an abstract-style method.
        // Subclasses are required to override it. Calling it directly on the base class
        // must throw so that developers are immediately alerted if they forget to
        // implement the method in a new subclass. This protects system stability by
        // catching missing overrides at runtime rather than silently producing bad output.

        const base = new FileResource("test", "json");
        expect(() => base.generate({ some: "data" })).to.throw("generate() must be implemented by subclass");
    });

    it("should throw when load() is called on the base class", function () {
        // Same reasoning as generate() above. load() is abstract on the base class.
        // Any call that reaches the base implementation means a subclass did not
        // override it, which would cause silent data loss when loading files.
        // Throwing here ensures the bug surfaces immediately.

        const base = new FileResource("test", "json");
        expect(() => base.load("raw string")).to.throw("load() must be implemented by subclass");
    });

    it("should throw when constructing FileResource without a filename or format", function () {
        // FileResource requires both a filename and a format to be meaningful.
        // Allowing construction without them would create broken instances that
        // produce invalid file paths. This test guards against accidental misuse
        // of the constructor throughout the application.

        expect(() => new FileResource("", "json")).to.throw("Filename is required");
        expect(() => new FileResource("file", "")).to.throw("Format is required");
    });

    // ─── MenuFileModel Tests ─────────────────────────────────────────────────

    it("should generate and load menu data correctly (round-trip)", function () {
        // This test validates the core polymorphic behavior of MenuFileModel.
        // generate() must serialize menu items into a structured string, and
        // load() must restore them to the original objects. A passing round-trip
        // confirms that menu exports and imports are lossless, which is critical
        // for features like menu backup and restore.

        const model = new MenuFileModel();
        const items = [
            { name: "Burger", price: 9.99 },
            { name: "Fries", price: 3.49 }
        ];

        const generated = model.generate(items);
        const loaded = model.load(generated);

        expect(loaded).to.have.lengthOf(2);
        expect(loaded[0].name).to.equal("Burger");
        expect(loaded[1].price).to.equal(3.49);
    });

    it("should throw when MenuFileModel receives an empty array", function () {
        // An empty menu export is almost certainly a bug — there is nothing to
        // write to the file. This edge case test ensures the model rejects empty
        // arrays rather than silently generating a useless file, which would
        // corrupt a restaurant's menu if imported back into the system.

        const model = new MenuFileModel();
        expect(() => model.generate([])).to.throw("Menu data must be a non-empty array of items");
    });

    // ─── OrderFileModel Tests ────────────────────────────────────────────────

    it("should generate and load order data correctly (round-trip)", function () {
        // OrderFileModel overrides generate() and load() to handle order-specific
        // structure (customer, items, total). This test confirms the override
        // correctly serializes and deserializes all fields, ensuring order history
        // exports preserve every piece of data needed to reconstruct an order.

        const model = new OrderFileModel();
        const orderData = {
            customer: "Alice",
            items: [{ name: "Pizza", price: 12.00 }],
            total: 12.00
        };

        const generated = model.generate(orderData);
        const loaded = model.load(generated);

        expect(loaded.customer).to.equal("Alice");
        expect(loaded.items).to.have.lengthOf(1);
        expect(loaded.total).to.equal(12.00);
    });

    it("should throw when OrderFileModel is missing required fields", function () {
        // An order without a customer or items is incomplete and should never be
        // written to a file. This test ensures the model validates structure before
        // generating output, preventing corrupt order records from entering storage.

        const model = new OrderFileModel();
        expect(() => model.generate({ customer: "Bob", items: [], total: 0 }))
            .to.throw("Order data must include a customer and at least one item");
        expect(() => model.generate({ items: [{ name: "Salad" }], total: 5 }))
            .to.throw("Order data must include a customer and at least one item");
    });

    // ─── InvoiceFileModel Tests ──────────────────────────────────────────────

    it("should generate and load invoice data correctly (round-trip)", function () {
        // InvoiceFileModel overrides generate() to compute the final total from
        // subtotal and tax. This test validates that the computation is correct
        // and that load() restores all fields accurately. Incorrect invoice totals
        // would directly affect billing, making this one of the highest-stakes
        // behaviors to verify.

        const model = new InvoiceFileModel();
        const invoiceData = { customer: "David", subtotal: 20.00, tax: 2.00 };

        const generated = model.generate(invoiceData);
        const loaded = model.load(generated);

        expect(loaded.customer).to.equal("David");
        expect(loaded.subtotal).to.equal(20.00);
        expect(loaded.tax).to.equal(2.00);
        expect(loaded.total).to.equal(22.00);
    });

    it("should throw when InvoiceFileModel is missing subtotal or tax", function () {
        // Generating an invoice without a subtotal or tax produces an arithmetically
        // meaningless result. This edge case test confirms the model rejects such
        // input rather than writing a file with undefined or NaN values, which
        // would break any downstream payment or accounting logic that reads the file.

        const model = new InvoiceFileModel();
        expect(() => model.generate({ customer: "Eve", tax: 1.00 }))
            .to.throw("Invoice data must include subtotal and tax");
        expect(() => model.generate({ customer: "Eve", subtotal: 10.00 }))
            .to.throw("Invoice data must include subtotal and tax");
    });

    // ─── Shared Validation Tests ─────────────────────────────────────────────

    it("should throw when any subclass receives null or empty data", function () {
        // The base class validate() method is shared across all subclasses.
        // This test confirms that the inherited validation fires correctly for
        // each subclass, preventing null or empty inputs from reaching the
        // serialization logic. Without this guard, subclasses could generate
        // malformed files that crash on load.

        const menu = new MenuFileModel();
        const order = new OrderFileModel();
        const invoice = new InvoiceFileModel();

        expect(() => menu.generate(null)).to.throw("Data cannot be null or undefined");
        expect(() => order.generate(null)).to.throw("Data cannot be null or undefined");
        expect(() => invoice.generate(null)).to.throw("Data cannot be null or undefined");
    });

    it("should throw when loading a file of the wrong type", function () {
        // Each subclass's load() method checks that the embedded type tag matches
        // its expected value. This prevents accidentally loading an order file into
        // a menu model or an invoice into an order model — a cross-type mistake that
        // would silently corrupt application state.

        const menuModel = new MenuFileModel();
        const orderModel = new OrderFileModel();

        const orderFile = orderModel.generate({
            customer: "Frank",
            items: [{ name: "Soup" }],
            total: 7.00
        });

        expect(() => menuModel.load(orderFile)).to.throw("File does not contain menu data");
    });

    it("should return correct file info from getInfo()", function () {
        // getInfo() is a shared utility on the base class that returns a human-readable
        // filename string. This test confirms it works correctly across all three
        // subclasses and that custom filenames and formats are respected. Correct
        // file naming is important for organizing exports on disk.

        expect(new MenuFileModel().getInfo()).to.equal("menu.json");
        expect(new OrderFileModel("order_123").getInfo()).to.equal("order_123.json");
        expect(new InvoiceFileModel("inv_456", "csv").getInfo()).to.equal("inv_456.csv");
    });

});
