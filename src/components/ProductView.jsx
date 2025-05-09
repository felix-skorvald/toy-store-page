import "./productview.css";
import { useAdminStore } from "../data/store.js";
import { editProduct } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";
import { useState } from "react";

const ProductView = ({ product }) => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const categories = useProductsStore((state) => state.categoryList);

    const [edited, setEdited] = useState({
        name: product.name,
        img: product.img,
        description: product.description,
        categories: product.categories,
        price: product.price,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEdited((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCategoryChange = (e) => {
        const { checked, value } = e.target;
        setEdited((prev) => {
            const updatedCategories = checked
                ? [...(prev.categories || []), value]
                : (prev.categories || []).filter((id) => id !== value);
            return {
                ...prev,
                categories: updatedCategories,
            };
        });
    };

    const handleSave = () => {
        editProduct(product.id, edited);
        console.log("Product updated:", edited);
    };
    return !isAdmin ? (
        <div className="product-view">
            <div>
                <img src={product.img} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p> {product.price}:-</p>
                <button>Lägg till i varukorgen</button>
            </div>
        </div>
    ) : (
        <div className="product-view">
            <div className="product-container">
                <div>
                    <h2>Redigera produkt</h2>
                    <label htmlFor="name">Title</label>
                    <input
                        type="text"
                        id="name"
                        value={edited.name}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="img">Image URL</label>
                    <input
                        type="text"
                        id="img"
                        value={edited.img}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="description">Beskrivning</label>
                    <input
                        type="text"
                        id="description"
                        value={edited.description}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="price">Pris</label>
                    <input
                        type="text"
                        id="price"
                        value={edited.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <img src={product.img} alt={product.name} />
                    <div className="category-container">
                        <label>Kategorier</label>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    value={category.id}
                                    checked={
                                        edited.categories?.includes(
                                            category.id
                                        ) || false
                                    }
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={`category-${category.id}`}>
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSave}>Spara ändringar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
