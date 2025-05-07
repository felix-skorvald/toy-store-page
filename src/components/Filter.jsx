import "./filter.css";
import { useProductsStore } from "../data/store.js";
import { getCategories } from "../data/crud.js";
import { useEffect } from "react";

const Filter = () => {
    const categories = useProductsStore((state) => state.categoryList);
    const setCategoryList = useProductsStore((state) => state.setCategoryList);

    useEffect(() => {
        getCategories(setCategoryList);
    }, []);

    return (
        <div className="filter">
            <div>
                <input type="text" />
                <button>Sök</button>
            </div>

            <select name="cars" id="cars" defaultValue="">
                <option value="" disabled>
                    Filtrera
                </option>
                <option value="alla">Alla</option>
                {/* här blir det map med alla katergorier */}
                {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;