class Promotion {
    constructor(name) {
        this.name = name;
    }

    applyDiscount(value) {
        throw new Error("applyDiscount must be implemented by subclasses");
    }
}

class PercentagePromotion extends Promotion {
    constructor(percent) {
        super("Percentage Promotion");
        this.percent = percent;
    }

    applyDiscount(total) {
        if (typeof total !== "number" || total < 0) {
            throw new Error("Total must be a non-negative number");
        }
        if (typeof this.percent !== "number" || this.percent < 0 || this.percent > 100) {
            throw new Error("Percent must be between 0 and 100");
        }

        return total - (total * this.percent) / 100;
    }
}

class FlatPromotion extends Promotion {
    constructor(amount) {
        super("Flat Promotion");
        this.amount = amount;
    }

    applyDiscount(total) {
        if (typeof total !== "number" || total < 0) {
            throw new Error("Total must be a non-negative number");
        }
        if (typeof this.amount !== "number" || this.amount < 0) {
            throw new Error("Flat discount must be a non-negative number");
        }

        return Math.max(0, total - this.amount);
    }
}

class BuyOneGetOne extends Promotion {
    constructor(itemPrice) {
        super("Buy One Get One");
        this.itemPrice = itemPrice;
    }

    applyDiscount(quantity) {
        if (!Number.isInteger(quantity) || quantity < 0) {
            throw new Error("Quantity must be a non-negative integer");
        }
        if (typeof this.itemPrice !== "number" || this.itemPrice < 0) {
            throw new Error("Item price must be a non-negative number");
        }

        const freeItems = Math.floor(quantity / 2);
        return freeItems * this.itemPrice;
    }
}

function applyPromotion() {
    const promotionType = document.getElementById("promotionType").value;
    const inputValue = Number(document.getElementById("inputValue").value);
    const totalValue = Number(document.getElementById("totalValue").value);
    const resultBox = document.getElementById("result");

    try {
        let resultText = "";

        if (promotionType === "percentage") {
            const promo = new PercentagePromotion(inputValue);
            const finalTotal = promo.applyDiscount(totalValue);

            resultText = `
        <strong>${promo.name}</strong><br>
        Original Total: $${totalValue.toFixed(2)}<br>
        Percent Off: ${inputValue}%<br>
        Final Total: <strong>$${finalTotal.toFixed(2)}</strong>
      `;
        } else if (promotionType === "flat") {
            const promo = new FlatPromotion(inputValue);
            const finalTotal = promo.applyDiscount(totalValue);

            resultText = `
        <strong>${promo.name}</strong><br>
        Original Total: $${totalValue.toFixed(2)}<br>
        Flat Discount: $${inputValue.toFixed(2)}<br>
        Final Total: <strong>$${finalTotal.toFixed(2)}</strong>
      `;
        } else if (promotionType === "bogo") {
            const promo = new BuyOneGetOne(totalValue);
            const discountAmount = promo.applyDiscount(inputValue);
            const freeItems = Math.floor(inputValue / 2);

            resultText = `
        <strong>${promo.name}</strong><br>
        Quantity: ${inputValue}<br>
        Item Price: $${totalValue.toFixed(2)}<br>
        Free Items: ${freeItems}<br>
        Discount Value: <strong>$${discountAmount.toFixed(2)}</strong>
      `;
        }

        resultBox.innerHTML = resultText;
    } catch (error) {
        resultBox.innerHTML = `<span class="text-danger"><strong>Error:</strong> ${error.message}</span>`;
    }
}