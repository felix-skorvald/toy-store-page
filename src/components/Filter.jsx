import "./filter.css";
import { sortProductsList, filterProducts } from "../data/filter-search.js"
import { useProductsStore } from "../data/store.js";
import { getCategories } from "../data/crud.js";
import { useEffect, useState } from "react";

const Filter = () => {
    const categories = useProductsStore((state) => state.categoryList);
    const setCategoryList = useProductsStore((state) => state.setCategoryList);
    const allProducts = useProductsStore((state) => state.productList);
    const setProductsToRender = useProductsStore((state) => state.setProductsToRender);

    const [selectedCategory, setSelectedCategory] = useState("alla");
    const [currentSort, setCurrentSort] = useState("default");
    const [search, setSearch] = useState("")

    useEffect(() => {
        getCategories(setCategoryList);
    }, []);

    useEffect(() => {
        let processedList = filterProducts(allProducts, selectedCategory, search, categories);
        processedList = sortProductsList(processedList, currentSort);
        setProductsToRender(processedList);
    }, [allProducts, selectedCategory, currentSort, categories, setProductsToRender, search]);

    const handleFilter = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleSort = (e) => {
        setCurrentSort(e.target.value)
    }



    return (
        <div className="filter">
            <div>
                <input type="text"
                    placeholder="Sök på produkt, beskrivning, kategori..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
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