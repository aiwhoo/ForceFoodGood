import FileResource from "./fileResourceModel.js";

class MenuFileModel extends FileResource {

    constructor(filename = "menu", format = "json") {
        super(filename, format);
    }

    // Serializes an array of menu items into a JSON string
    generate(menuData) {
        this.validate(menuData);

        if (!Array.isArray(menuData) || menuData.length === 0) {
            throw new Error("Menu data must be a non-empty array of items");
        }

        const output = {
            type: "menu",
            generatedAt: new Date().toISOString(),
            items: menuData
        };

        return JSON.stringify(output, null, 2);
    }

    // Parses a JSON string back into an array of menu items
    load(raw) {
        this.validate(raw);

        const parsed = JSON.parse(raw);

        if (parsed.type !== "menu") {
            throw new Error("File does not contain menu data");
        }

        return parsed.items;
    }

}

export default MenuFileModel;
