import "./productview.css";
import { useAdminStore } from "../data/store.js";
import { editProduct } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";
import { useCartStore } from "../data/store.js";
import { addNewValidation } from "../data/validation.js";
import { useState } from "react";

const ProductView = ({ product }) => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const categories = useProductsStore((state) => state.categoryList);
    const cart = useCartStore((state) => state.cart);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const plusQuantity = useCartStore((state) => state.plusQuantity);
    const inCart = cart ? cart.some(item => item.id == product.id) : false;

    const [edited, setEdited] = useState({
        name: product.name,
        img: product.img,
        description: product.description,
        categories: product.categories,
        price: product.price,
    });

    const [errors, setErrors] = useState({});

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
        const productToValidate = {
            title: edited.name,
            img: edited.img,
            description: edited.description,
            price: Number(edited.price),
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
                    <button onClick={handleAdd}>{!inCart ? "Lägg till i varukorgen" : "Tillagd ✔"}</button>
                </div>
            </div>
        </div>
    ) : (
        <div className="product-view">
            <div className="product-container">
                <div>
                    <h2>Redigera produkt</h2>
                    <img src={product.img} alt={product.name} />
                    <label htmlFor="name">Titel</label>
                    <input
                        type="text"
                        id="name"
                        value={edited.name}
                        onChange={handleInputChange}
                        className={errors.title ? "error-border" : ""}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <label htmlFor="img">Bild-URL</label>
                    <input
                        type="text"
                        id="img"
                        value={edited.img}
                        onChange={handleInputChange}
                        className={errors.img ? "error-border" : ""}
                    />
                    {errors.img && <p className="error">{errors.img}</p>}

                    <label htmlFor="description">Beskrivning</label>
                    <input
                        type="text"
                        id="description"
                        value={edited.description}
                        onChange={handleInputChange}
                        className={errors.description ? "error-border" : ""}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}

                    <label htmlFor="price">Pris</label>
                    <input
                        type="text"
                        id="price"
                        value={edited.price}
                        onChange={handleInputChange}
                        className={errors.price ? "error-border" : ""}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
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
