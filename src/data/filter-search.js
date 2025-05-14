const filterProducts = (
    allProducts,
    selectedCategoryId,
    searchTerm,
    allCategoriesList
) => {
    let processedList = [...allProducts];

    if (selectedCategoryId && selectedCategoryId !== "alla") {
        processedList = processedList.filter(product =>
            product.categories.includes(selectedCategoryId)
        );
    }

    if (searchTerm && searchTerm.trim() !== "") {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        const matchingCategoryIdsFromSearch = allCategoriesList
            .filter(cat => cat.name.toLowerCase().includes(lowerSearchTerm))
            .map(cat => cat.id);

        processedList = processedList.filter(product => {

            const nameMatches = product.name.toLowerCase().includes(lowerSearchTerm);

            const descriptionMatches = product.description
                ? product.description.toLowerCase().includes(lowerSearchTerm)
                : false;

            const categoryNameMatches = product.categories.some(prodCatId =>
                matchingCategoryIdsFromSearch.includes(prodCatId)
            );

            return nameMatches || descriptionMatches || categoryNameMatches;
        });
    }

    return processedList;
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
        case "zeta":
            return listToSort.sort((a, b) => b.name.localeCompare(a.name));
        case "default":
        default:
            return listToSort;
    }
};

export { sortProductsList, filterProducts }