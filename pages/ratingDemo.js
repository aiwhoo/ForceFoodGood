import RestaurantRatingModel from "../core/models/ratings/restaurantRatingsModel.js";
import DeliveryDriverRatingModel from "../core/models/ratings/deliveryDriverRatingsModel.js";
import MenuItemRatingModel from "../core/models/ratings/menuItemRatingsModel.js";

const reviews = [];

window.addReview = function(){

    const type = document.getElementById("ratingType").value;
    const stars = parseInt(document.getElementById("stars").value);
    const text = document.getElementById("reviewText").value;

    let rating;

    if(type === "restaurant"){
        rating = new RestaurantRatingModel(stars,"User","Today",text,1);
    }

    if(type === "menu"){
        rating = new MenuItemRatingModel(stars,"User","Today",text,1);
    }

    if(type === "driver"){
        rating = new DeliveryDriverRatingModel(stars,"User","Today",text,1);
    }

    reviews.push(rating);

    renderReviews();
}

function renderReviews(){

    const container = document.getElementById("reviewList");
    container.innerHTML = "";

    reviews.forEach(r => {

        const div = document.createElement("div");
        div.className = "review";

        div.innerHTML = `
<div class="d-flex justify-content-between">
<strong>User</strong>
<span class="review-stars">${"★".repeat(r.stars)}</span>
</div>

<div>${r.review}</div>

<small class="text-muted">${r.constructor.name}</small>
`;

        container.appendChild(div);

    });

    updateAverage();
}

function updateAverage(){

    if(reviews.length === 0) return;

    let total = 0;

    reviews.forEach(r => total += r.stars);

    const avg = (total/reviews.length).toFixed(1);

    document.getElementById("averageRating").innerText =
        "Average Rating: " + avg + " ★";

}


const ratingType = document.getElementById("ratingType");
const itemName = document.getElementById("itemName");

ratingType.addEventListener("change", function() {

    if (ratingType.value === "restaurant") {
        itemName.textContent = "Anish's Cat Cafe";
    }

    else if (ratingType.value === "menu") {
        itemName.textContent = "Spicy Tuna Roll";
    }

    else if (ratingType.value === "driver") {
        itemName.textContent = "Driver: Alex";
    }

});