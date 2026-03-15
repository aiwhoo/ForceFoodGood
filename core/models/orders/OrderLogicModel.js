import CartOrderModel from "./CartOrderModel.js";
import ConfirmedOrderModel from "./ConfirmedOrderModel.js";
import PastOrderModel from "./PastOrderModel.js";
import MenuItemModel from "../menuItemModel.js";
import pastOrderModel from "./PastOrderModel.js";

// 1. Mock Data Setup
const mockBase = { username: "HungryStudent", restaurant: "Pizza Palace", id: "FFG-123" };
const validCodes = { "SAVE5": 0.05 };
const cart = new CartOrderModel(mockBase, Date.now(), "SAVE5", [], validCodes);

// 2. UI Elements
const cartItemsDiv = document.getElementById('cart-items');
const totalSpan = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const orderSummaryDiv = document.getElementById('order-summary');

// 3. Simple function to add a mock item and update UI
function addItemToCart(aMenuItem) {
    cart.addMenuItem(aMenuItem);
    updateUI();
}


function updateUI() {
    // Render items
    cartItemsDiv.innerHTML = cart.itemsOrdered.map(item => `
        <div class="flex justify-between text-sm">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');

    // Update Totals (Using the logic in your CartOrderModel)
    document.getElementById('subtotal').innerText = `$${cart.subtotal.toFixed(2)}`;
    document.getElementById('tax').innerText = `$${cart.taxTotal.toFixed(2)}`;
    totalSpan.innerText = `$${cart.totalCost.toFixed(2)}`;
}

// 4. Handle Checkout (Promotion from Cart -> Confirmed)
checkoutBtn.addEventListener('click', () => {
    if (cart.itemsOrdered.length === 0) return alert("Add items first!");

    const confirmed = new ConfirmedOrderModel(cart, "PAY-999", "123 Main St");
    confirmed.updateStatus("Confirmed");

    // Show the status section
    document.getElementById('status-section').classList.remove('hidden');
    orderSummaryDiv.innerText = confirmed.summary();
    document.getElementById('order-id').innerText = `ID: ${confirmed.getId()}`;
    document.getElementById('order-status').innerText = confirmed.getStatus();

    checkoutBtn.disabled = true;
    checkoutBtn.innerText = "Order Placed!";
    setTimeout(()=>{
        console.log("Timeout ran");
        const pastOrder = new PastOrderModel(confirmed,"3/13/2026");
        pastOrder.updateStatus("Delivered");
        document.getElementById('order-status').innerText = pastOrder.getStatus();
        orderSummaryDiv.innerText = pastOrder.summary();
        document.getElementById('past-orders-list').innerText = `ID: ${pastOrder.getId()}`;
        updateUI();
    }, 5000);
});

// Seed the cart with one item for the demo
addItemToCart(new MenuItemModel("pizza", 5.42,"idk","pizza"));
orderSummaryDiv.innerText = cart.summary();