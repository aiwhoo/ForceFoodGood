import RatingModel from "./ratingsModel.js";

class MenuItemRatingModel extends RatingModel {

    constructor(stars, username, date, menuItemId, ratingImage, review = "") {
        super(stars, username, date, review);
        this.menuItemId = menuItemId;
        this.ratingImage = ratingImage;
    }

    deleteImage(){
        this.ratingImage = ""
    }

}

export default MenuItemRatingModel;