import FileResource from "./fileResourceModel.js";

class InvoiceFileModel extends FileResource {

    constructor(filename = "invoice", format = "json") {
        super(filename, format);
    }

    // Serializes invoice data (subtotal, tax, total, timestamp) into a JSON string
    generate(invoiceData) {
        this.validate(invoiceData);

        if (invoiceData.subtotal === undefined || invoiceData.tax === undefined) {
            throw new Error("Invoice data must include subtotal and tax");
        }

        const output = {
            type: "invoice",
            generatedAt: new Date().toISOString(),
            customer: invoiceData.customer ?? "Unknown",
            subtotal: invoiceData.subtotal,
            tax: invoiceData.tax,
            total: invoiceData.subtotal + invoiceData.tax
        };

        return JSON.stringify(output, null, 2);
    }

    // Parses a JSON string back into an invoice object
    load(raw) {
        this.validate(raw);

        const parsed = JSON.parse(raw);

        if (parsed.type !== "invoice") {
            throw new Error("File does not contain invoice data");
        }

        return {
            customer: parsed.customer,
            subtotal: parsed.subtotal,
            tax: parsed.tax,
            total: parsed.total,
            generatedAt: parsed.generatedAt
        };
    }

}

export default InvoiceFileModel;
