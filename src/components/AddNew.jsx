import { useAdminStore } from "../data/store";
import { useProductsStore } from "../data/store.js";
import { addNewProduct } from "../data/crud.js";
import { useState } from "react";

import { addNewValidation } from "../data/validation.js";


const AddNew = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const categories = useProductsStore((state) => state.categoryList);
    const [newProduct, setNewProduct] = useState({
        name: "",
        img: "",
        description: "",
        categories: [],
        price: null,
    });

    const [errors, setErrors] = useState({});

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
        const productToValidate = {
            title: newProduct.name,
            img: newProduct.img,
            description: newProduct.description,
            price: Number(newProduct.price),
        };

        const { error } = addNewValidation.validate(productToValidate, {
            abortEarly: false,
        });

        if (error) {
            const validationErrors = {};
            error.details.forEach((detail) => {
                validationErrors[detail.path[0]] = detail.message;
            });
            setErrors(validationErrors);
            return;
        }

        setErrors({});
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
                    <label htmlFor="name">Titel</label>
                    <input
                        type="text"
                        id="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className={errors.title ? "error-border" : ""}
                    />
                    {errors.title && <p className="error">{errors.title}</p>}

                    <label htmlFor="img">Bild-URL</label>
                    <input
                        type="text"
                        id="img"
                        value={newProduct.img}
                        onChange={handleInputChange}
                        className={errors.img ? "error-border" : ""}
                    />
                    {errors.img && <p className="error">{errors.img}</p>}

                    <label htmlFor="description">Beskrivning</label>
                    <input
                        type="text"
                        id="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className={errors.description ? "error-border" : ""}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}

                    <label htmlFor="price">Pris</label>
                    <input
                        type="number"
                        id="price"
                        value={newProduct.price !== null ? newProduct.price : ""}
                        onChange={handleInputChange}
                        className={errors.price ? "error-border" : ""}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div>
                    <div className="category-container">
                        <label>Kategorier</label>
                        {categories.map((category) => (
                            <div className="category-button" key={category.id}>
                                <input
                                    type="checkbox"
                                    id={category.id}
                                    value={category.id}
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={category.id}>
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
