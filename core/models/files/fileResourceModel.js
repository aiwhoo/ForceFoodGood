class FileResource {

    constructor(filename, format) {
        if (!filename) throw new Error("Filename is required");
        if (!format) throw new Error("Format is required");

        this.filename = filename;
        this.format = format;
    }

    // Subclasses must override this to serialize data into a file string
    generate(data) {
        throw new Error("generate() must be implemented by subclass");
    }

    // Subclasses must override this to parse a raw file string back into an object
    load(raw) {
        throw new Error("load() must be implemented by subclass");
    }

    // Shared validation used by subclasses before generating or loading
    validate(data) {
        if (data === null || data === undefined) {
            throw new Error("Data cannot be null or undefined");
        }
        if (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0) {
            throw new Error("Data cannot be an empty object");
        }
        if (typeof data === "string" && data.trim() === "") {
            throw new Error("Data cannot be an empty string");
        }
    }

    getInfo() {
        return `${this.filename}.${this.format}`;
    }

}

export default FileResource;
