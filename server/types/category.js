class Category {
    constructor(categoryData) {
        this.categoryId = categoryData.id;
        this.categoryName = categoryData.name;
    }

    id() {
        return this.categoryId;
    }

    name() {
        return this.categoryName;
    }
}

module.exports = {
    Category,
};
