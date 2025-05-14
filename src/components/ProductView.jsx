import "./productview.css";
import { useAdminStore } from "../data/store.js";
import { editProduct } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";
import { useCartStore } from "../data/store.js";
import { useState } from "react";

const ProductView = ({ product }) => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const categories = useProductsStore((state) => state.categoryList);
    const cart = useCartStore((state) => state.cart);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const plusQuantity = useCartStore((state) => state.plusQuantity);

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


    const handleAdd = () => {
        let cartItem = {
            id: product.id,
            name: product.name,
            quantity: 1,
            price: product.price,
        };
        if (cart) {
            const foundItem = cart.find((item) => item.id == product.id);
            if (foundItem) {
                plusQuantity(product.id);

                return;
            }
        }

        addCartItem(cartItem);
    };

    return !isAdmin ? (
        <div className="product-view">
            <div className="product-container">
                <div>
                    <img src={product.img} alt={product.name} />
                    <p>{product.description}</p>
                </div>
                <div>
                    <h2>{product.name}</h2>
                    <h3 className="price"> {product.price}:-</h3>
                    <button onClick={handleAdd}>Lägg till i varukorgen</button>
                </div>
            </div>
        </div>
    ) : (
        <div className="product-view">
            <div className="product-container">
                <div>
                    <h2>Redigera produkt</h2>
                    <img src={product.img} alt={product.name} />
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
                    <h3>Kategorier</h3>
                    <div className="category-container">
                        {categories.map((category) => (
                            <div className="category-button" key={category.id}>
                                <input
                                    type="checkbox"
                                    id={category.id}
                                    value={category.id}
                                    checked={
                                        edited.categories?.includes(
                                            category.id
                                        ) || false
                                    }
                                    onChange={handleCategoryChange}
                                />
                                <label htmlFor={category.id}>
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
