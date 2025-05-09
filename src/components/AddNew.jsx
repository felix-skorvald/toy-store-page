import { useAdminStore } from "../data/store";
import { useProductsStore } from "../data/store.js";
import { addNewProduct } from "../data/crud.js";
import { useState } from "react";

const AddNew = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const categories = useProductsStore((state) => state.categoryList);
    const [newProduct, setNewProduct] = useState({
        name: "",
        img: "",
        description: "",
        categories: [],
        price: 0,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCategoryChange = (e) => {
        const { checked, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            categories: checked
                ? [...prev.categories, value]
                : prev.categories.filter((id) => id !== value),
        }));
    };

    const handleSave = () => {
        console.log("Product added:", newProduct);
        addNewProduct(newProduct);
    };

    return !isAdmin ? (
        <div>
            <h1>Försök inte ens</h1>
            <h2>40000000004</h2>
        </div>
    ) : (
        <div className="product-view">
            <div className="product-container">
                <div>
                    <h2>LäggTill Ny</h2>
                    <label htmlFor="name">Title</label>
                    <input
                        type="text"
                        id="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="img">Image URL</label>
                    <input
                        type="text"
                        id="img"
                        value={newProduct.img}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="description">Beskrivning</label>
                    <input
                        type="text"
                        id="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="price">Pris</label>
                    <input
                        type="text"
                        id="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <div className="category-container">
                        <label>Kategorier</label>
                        {categories.map((category) => (
                            <div className="category-button" key={category.id}>
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    value={category.id}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={`category-${category.id}`}>
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSave}>Ladda upp ny produkt</button>
                </div>
            </div>
        </div>
    );
};

export default AddNew;
