const filterProducts = (products, categoryId) => {
    if (!categoryId || categoryId === "alla") {
        return [...products];
    }
    return products.filter(p => p.categories.includes(categoryId));
};

const sortProductsList = (products, sortType) => {
    const listToSort = [...products];

    switch (sortType) {
        case "lowest":
            return listToSort.sort((a, b) => a.price - b.price);
        case "highest":
            return listToSort.sort((a, b) => b.price - a.price);
        case "alpha":
            return listToSort.sort((a, b) => a.name.localeCompare(b.name));
        case "default":
        default:
            return listToSort;
    }
};

export { sortProductsList, filterProducts }