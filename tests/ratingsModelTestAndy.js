describe('Restaurant Rating System', function() {
    it('should create a valid rating for this happy test', function() {
        const rating = new RatingModel(3, "Andy", "2026-3-3", "The food was very tasty");
        expect(rating.stars).to.equal(3);
        expect(rating.username).to.equal("Andy");
    });

    it('should create a valid rating for this edge case for boundary values 0 and 5', function() {
        const min = new RatingModel(0, "Andy", "2026-3-3", "The food was very tasty");
        const max = new RatingModel(5, "Andy", "2026-3-3", "The food was very tasty");
        expect(min.stars).to.equal(0);
        expect(max.stars).to.equal(5);
    });

    it('should throw an error if the input of stars are invalid (<1 or >5)', function() {
        expect(() => new RatingModel(-1, "Lee", "in a year", "terrible")).to.throw();
        expect(() => new RatingModel(6, "Lee", "in a year", "amazing")).to.throw();
    });

    it('should correctly store all inputted properties', function() {
        const newRating = new RatingModel(4, "Lee", "2026-3-11", "The food was very bland");
        expect(newRating.stars).to.equal(4);
        expect(newRating.username).to.equal("Lee");
        expect(newRating.date).to.equal("2026-3-11");
        expect(newRating.review).to.equal("The food was very bland");
    });
});