import MenuFileModel from "../core/models/files/menuFileModel.js";
import OrderFileModel from "../core/models/files/orderFileModel.js";
import InvoiceFileModel from "../core/models/files/invoiceFileModel.js";

// Holds the last generated file string so Load can use it
let lastGenerated = null;

// ── Form templates per file type ─────────────────────────────────────────────

const FORMS = {
    menu: `
        <div class="mb-3">
            <label class="section-label">Menu Items (one per line: name, price)</label>
            <textarea id="menuItems" class="form-control" rows="4" placeholder="Burger, 9.99&#10;Fries, 3.49&#10;Soda, 1.99">Burger, 9.99
Fries, 3.49
Soda, 1.99</textarea>
        </div>`,

    order: `
        <div class="mb-3">
            <label class="section-label">Customer Name</label>
            <input id="orderCustomer" class="form-control" placeholder="Alice" value="Alice">
        </div>
        <div class="mb-3">
            <label class="section-label">Items (one per line: name, price)</label>
            <textarea id="orderItems" class="form-control" rows="3" placeholder="Pizza, 12.00&#10;Salad, 7.50">Pizza, 12.00
Salad, 7.50</textarea>
        </div>`,

    invoice: `
        <div class="mb-3">
            <label class="section-label">Customer Name</label>
            <input id="invoiceCustomer" class="form-control" placeholder="David" value="David">
        </div>
        <div class="mb-3">
            <label class="section-label">Subtotal ($)</label>
            <input id="invoiceSubtotal" class="form-control" type="number" step="0.01" placeholder="20.00" value="20.00">
        </div>
        <div class="mb-3">
            <label class="section-label">Tax ($)</label>
            <input id="invoiceTax" class="form-control" type="number" step="0.01" placeholder="2.00" value="2.00">
        </div>`
};

// ── Populate form on type change ─────────────────────────────────────────────

window.updateForm = function () {
    const type = document.getElementById("fileType").value;
    document.getElementById("formFields").innerHTML = FORMS[type];
    document.getElementById("classTag").textContent = {
        menu: "MenuFileModel",
        order: "OrderFileModel",
        invoice: "InvoiceFileModel"
    }[type];

    // Reset output panels
    lastGenerated = null;
    document.getElementById("generateOutput").textContent = "Output will appear here after clicking Generate File.";
    document.getElementById("generateOutput").classList.add("text-muted", "fst-italic");
    document.getElementById("loadOutput").textContent = "Click Load File after generating to see the parsed result.";
    document.getElementById("loadOutput").classList.add("text-muted", "fst-italic");
    document.getElementById("loadBtn").disabled = true;
};

// ── Parse helpers ────────────────────────────────────────────────────────────

function parseLineItems(raw) {
    return raw.trim().split("\n").map(line => {
        const parts = line.split(",");
        return { name: parts[0]?.trim(), price: parseFloat(parts[1]) || 0 };
    });
}

// ── Generate ─────────────────────────────────────────────────────────────────

window.handleGenerate = function () {
    const type = document.getElementById("fileType").value;
    const outputEl = document.getElementById("generateOutput");

    try {
        let result;

        if (type === "menu") {
            const items = parseLineItems(document.getElementById("menuItems").value);
            result = new MenuFileModel().generate(items);
        }

        if (type === "order") {
            const customer = document.getElementById("orderCustomer").value.trim();
            const items = parseLineItems(document.getElementById("orderItems").value);
            const total = items.reduce((sum, i) => sum + i.price, 0);
            result = new OrderFileModel().generate({ customer, items, total });
        }

        if (type === "invoice") {
            const customer = document.getElementById("invoiceCustomer").value.trim();
            const subtotal = parseFloat(document.getElementById("invoiceSubtotal").value);
            const tax = parseFloat(document.getElementById("invoiceTax").value);
            result = new InvoiceFileModel().generate({ customer, subtotal, tax });
        }

        lastGenerated = result;
        outputEl.textContent = result;
        outputEl.classList.remove("text-muted", "fst-italic");
        document.getElementById("loadBtn").disabled = false;

    } catch (err) {
        outputEl.textContent = "Error: " + err.message;
        outputEl.classList.remove("fst-italic");
        outputEl.style.color = "#f38ba8";
    }
};

// ── Load ─────────────────────────────────────────────────────────────────────

window.handleLoad = function () {
    const type = document.getElementById("fileType").value;
    const outputEl = document.getElementById("loadOutput");

    try {
        let result;

        if (type === "menu")    result = new MenuFileModel().load(lastGenerated);
        if (type === "order")   result = new OrderFileModel().load(lastGenerated);
        if (type === "invoice") result = new InvoiceFileModel().load(lastGenerated);

        outputEl.textContent = JSON.stringify(result, null, 2);
        outputEl.classList.remove("text-muted", "fst-italic");
        outputEl.style.color = "";

    } catch (err) {
        outputEl.textContent = "Error: " + err.message;
        outputEl.classList.remove("fst-italic");
        outputEl.style.color = "#f38ba8";
    }
};

// ── Init ──────────────────────────────────────────────────────────────────────

updateForm();
