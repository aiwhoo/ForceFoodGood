describe('Restaurant Rating System', function() {
    it('should create a valid rating', function() {
        const rating = new RatingModel(4, "Jason", "2026-03-01", "Good");

        expect(rating.stars).to.equal(4);
        expect(rating.username).to.equal("Jason");
    });

    it('should accept boundary values (0 and 5)', function() {
        const min = new RatingModel(0,"Anon","Today","This sucks.");
        const max = new RatingModel(5,"John","Yesterday","Splendid service!");

        expect(min.stars).to.equal(0);
        expect(max.stars).to.equal(5);

    })
    it('should throw an error if the stars are invalid (<0 or >5', function() {
        expect(() => new RatingModel(-1, "Troll", "Today")).to.throw();
        expect(() => new RatingModel(6, "Troll", "Today")).to.throw();
    })
    it('should correctly store all provided properties', function() {
        const newRating = new RatingModel(3, "Jason", "2026-03-01", "Okay, but the service was a bit slow.");

        expect(newRating.stars).to.equal(3);
        expect(newRating.username).to.equal("Jason");
        expect(newRating.date).to.equal("2026-03-01");
        expect(newRating.review).to.equal("Okay, but the service was a bit slow.");
    });

});