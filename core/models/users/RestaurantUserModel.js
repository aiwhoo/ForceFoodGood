class RestaurantUserModel extends UserModel {
    login(userEmail){
        return true; //overriding parent class behavior
    }
}

export default RestaurantUserModel