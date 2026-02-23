function checkout() {
    const messageDiv = document.getElementById("confirmationMessage");

    if (messageDiv) {
        messageDiv.innerHTML = `
      <div class="alert alert-success">
        ✅ Your order has been placed successfully.
      </div>
    `;
    } else {
        console.error("confirmationMessage div not found");
    }
}