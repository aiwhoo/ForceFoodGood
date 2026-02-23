function displayOrderConfirmation() {
    const messageDiv = document.getElementById("confirmationMessage");

    if (messageDiv) {
        messageDiv.innerHTML = `
      <div class="alert alert-success">
        ✅ Your order has been placed successfully1
      </div>
    `;
    } else {
        console.error("confirmationMessage div not found");
    }
}