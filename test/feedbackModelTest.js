import { expect } from 'chai';
import {
    Feedback,
    RestaurantFeedback,
    DriverFeedback,
    MenuItemFeedback
} from '../core/models/feedbackModel.js';

describe('Feedback Polymorphism Tests', () => {
    it('should throw an error for invalid rating (Validation Test)', () => {
        expect(() => new Feedback("Andy", 6, "Bad")).to.throw("Rating must be between 1 and 5");
    });

    it('should correctly override for RestaurantFeedback', () => {
        const rf = new RestaurantFeedback("Andy", 5, "Great!", "Taco Bell");
        expect(rf.getFormattedFeedback()).to.contain("Restaurant: Taco Bell");
    });

    it('should correctly override for DriverFeedback', () => {
        const df = new DriverFeedback("Andy", 4, "Fast", "John");
        expect(df.getFormattedFeedback()).to.contain("Driver: John");
    });

    it('should demonstrate polymorphism by processing a list of mixed feedback', () => {
        const feedbackList = [
            new RestaurantFeedback("Andy", 5, "Good", "Cafe A"),
            new DriverFeedback("Bob", 2, "Slow", "Driver X")
        ];
        const outputs = feedbackList.map(f => f.getFormattedFeedback());
        expect(outputs[0]).to.contain("Restaurant");
        expect(outputs[1]).to.contain("Driver");
    }); // <--- Added this to close the mixed feedback test

    it('should correctly override for MenuItemFeedback', () => {
        const mf = new MenuItemFeedback("Andy", 5, "Amazing Pizza", "Pepperoni Pizza");
        expect(mf.getFormattedFeedback()).to.contain("Food: Pepperoni Pizza");
    });
}); // This correctly closes the describe block