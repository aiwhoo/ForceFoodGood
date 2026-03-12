import MenuItemModel from "./menuItemModel.js";

class RatingModel {
    constructor(stars,  username,date, review="" ) {
        this.stars = stars;
        if(this.stars < 0 || this.stars > 5){
            throw new Error("Stars must be between 0 and 5");
        }
        this.username = username;
        this.date = date;
        this.review = review;
    }
}
export default RatingModel