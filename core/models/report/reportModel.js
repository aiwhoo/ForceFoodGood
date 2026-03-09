class Report {
    constructor({ data, dateRange, options = {} }) {
        this.data = data;
        this.dateRange = dateRange;
        this.options = options;

        this.generatedAt = new Date();
        this.type = this.constructor.name; // e.g., "SalesReport"
    }

    validate() {
        // data must exist and be an array
        if (!Array.isArray(this.data)) {
            throw new Error(`${this.type}: "data" must be an array`);
        }

        // dateRange must exist and have start/end
        if (!this.dateRange || typeof this.dateRange !== "object") {
            throw new Error(`${this.type}: "dateRange" must be provided`);
        }

        const { start, end } = this.dateRange;

        if (!start || !end) {
            throw new Error(`${this.type}: "dateRange" must include { start, end }`);
        }

        // start and end must be valid dates
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error(`${this.type}: "dateRange.start" and "dateRange.end" must be valid dates`);
        }

        // start must be before end
        if (startDate > endDate) {
            throw new Error(`${this.type}: "dateRange.start" must be before "dateRange.end"`);
        }

        // options must be an object
        if (typeof this.options !== "object" || this.options === null) {
            throw new Error(`${this.type}: "options" must be an object`);
        }
    }

    preprocess() {
        // Ensure data is an array of objects
        this.data = this.data
            .filter(item => item && typeof item === "object")
            .map(item => ({ ...item })); // shallow clone to avoid mutation

        // Normalize date fields if present
        this.data = this.data.map(item => {
            if (item.date) {
                const d = new Date(item.date);
                item.date = isNaN(d.getTime()) ? null : d;
            }
            if (item.createdAt) {
                const d = new Date(item.createdAt);
                item.createdAt = isNaN(d.getTime()) ? null : d;
            }
            if (item.updatedAt) {
                const d = new Date(item.updatedAt);
                item.updatedAt = isNaN(d.getTime()) ? null : d;
            }
            return item;
        });

        // Sort by date if available
        this.data.sort((a, b) => {
            const da = a.date || a.createdAt;
            const db = b.date || b.createdAt;
            if (!da || !db) return 0;
            return da - db;
        });
    }
    compute() {
        // Abstract placeholder.
        // Subclasses (SalesReport, RatingReport, DeliveryReport) implement analytics here.
        return {};
    }

    serialize(result) {
        // Standardized output shape for the frontend.
        return {
            type: this.type,
            dateRange: this.dateRange,
            generatedAt: this.generatedAt,
            options: this.options,
            result,          // whatever compute() returned
        };
    }

    generate() {
        // Orchestrates the full report lifecycle.
        this.validate();
        this.preprocess();

        const result = this.compute();
        return this.serialize(result);
    }

}
