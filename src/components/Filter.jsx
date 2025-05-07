import "./filter.css";
import { useProductsStore } from "../data/store.js";
import { getCategories, getProducts } from "../data/crud.js";
import { useEffect } from "react";

const Filter = () => {
    const categories = useProductsStore((state) => state.categoryList);
    const setCategoryList = useProductsStore((state) => state.setCategoryList);
    const products = useProductsStore((state) => state.productList);
    const setProductsToRender = useProductsStore((state) => state.setProductsToRender);
    const productsToRender = useProductsStore((state) => state.productsToRender);
    let sortedList = null

    useEffect(() => {
        getCategories(setCategoryList);
    }, []);

    const handleFilter = (e) => {
        let listToFilter = products

        if (sortedList) {
            listToFilter = sortedList

        }

        if (e.target.value === "alla") {
            setProductsToRender(products);
            return;
        }
        const selectedCategoryId = e.target.value;
        const filteredList = listToFilter.filter((p) =>
            p.categories.includes(selectedCategoryId
            ));
        setProductsToRender(filteredList)
    }

    const handleSort = (e) => {
        const selectedSort = e.target.value

        if (selectedSort == "lowest") {
            sortedList = [...productsToRender].sort((a, b) => a.price - b.price)
        } else if (selectedSort == "highest") {
            sortedList = [...productsToRender].sort((a, b) => b.price - a.price)
        } else if (selectedSort == "alpha") {
            sortedList = [...productsToRender].sort((a, b) => a.name.localeCompare(b.name))
        } else {
            sortedList = null
            setProductsToRender(products)
            return;
        }

        setProductsToRender(sortedList)
    }



    return (
        <div className="filter">
            <div>
                <input type="text" />
                <button>Sök</button>
            </div>
            <div>
                <select onChange={handleFilter} name="categories" id="categories" defaultValue="">
                    <option value="" disabled>
                        Kategorier
                    </option>
                    <option value="alla">Alla</option>
                    {/* här blir det map med alla katergorier */}
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select onChange={handleSort} name="sort" id="sort" defaultValue="">
                    <option value="" disabled>
                        Sortera
                    </option>
                    <option value="default">Populärast</option>
                    <option value="lowest">Lägsta pris</option>
                    <option value="highest">Högsta pris</option>
                    <option value="alpha">Bokstavsordning</option>

                </select>

            </div>

        </div>
    );
};

export default Filter;