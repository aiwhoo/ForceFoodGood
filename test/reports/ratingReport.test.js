import { expect } from "chai";
import RatingReportModel from "../../core/models/report/ratingReportModel.js";
import RatingModel from "../../core/models/ratingsModel.js";

describe("RatingReport", () => {
    it("calls validate(), preprocess(), compute(), and serialize() in generate()", () => {
        // this test ensures that all processing functions are called in the report

        const rating = new RatingModel(5, "anish", "2024-01-01", "great");

        const report = new RatingReportModel({
            data: [rating],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        let validateCalled = false;
        let preprocessCalled = false;
        let computeCalled = false;
        let serializeCalled = false;

        report.validate = () => { validateCalled = true; };
        report.preprocess = () => { preprocessCalled = true; };
        report.compute = () => { computeCalled = true; return {}; };
        report.serialize = () => { serializeCalled = true; return {}; };

        report.generate();

        expect(validateCalled).to.equal(true);
        expect(preprocessCalled).to.equal(true);
        expect(computeCalled).to.equal(true);
        expect(serializeCalled).to.equal(true);
    });

    it("correctly computes average rating, count, and distribution", () => {
        const r1 = new RatingModel(5, "anish", "2024-01-01");
        const r2 = new RatingModel(3, "kai", "2024-01-02");
        const r3 = new RatingModel(4, "bob", "2024-01-03");

        const report = new RatingReportModel({
            data: [r1, r2, r3],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.averageRating).to.equal((5 + 3 + 4) / 3);
        expect(output.result.ratingCount).to.equal(3);
        expect(output.result.distribution).to.deep.equal({
            1: 0,
            2: 0,
            3: 1,
            4: 1,
            5: 1
        });
    });
    it("returns zeros when no ratings exist", () => {
        // edge case for when there are no ratings, which can happen, and thus we would want to return 0
        const report = new RatingReportModel({
            data: [],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.averageRating).to.equal(0);
        expect(output.result.ratingCount).to.equal(0);
        expect(output.result.distribution).to.deep.equal({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        });
    });

    it("safely ignores malformed rating objects", () => {
        // if for some reason, a rating isn't a number, our computations should ignore them
        const badRating = { stars: "not-a-number" };
        const goodRating = new RatingModel(5, "anish", "2024-01-01");

        const report = new RatingReportModel({
            data: [badRating, goodRating],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.averageRating).to.equal(5);
        expect(output.result.ratingCount).to.equal(1);
        expect(output.result.distribution).to.deep.equal({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 1
        });
    });

    it("throws an error when dateRange is missing", () => {
        // test failure condition ensuring that there is always a date range for the report filter
        const rating = new RatingModel(5, "anish", "2024-01-01");

        expect(() => {
            new RatingReportModel({
                data: [rating],
                dateRange: null,
                options: {}
            }).generate();
        }).to.throw();
    });
});