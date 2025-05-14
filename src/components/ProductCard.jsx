import { NavLink } from "react-router";
import { useCartStore } from "../data/store.js";
import { useAdminStore } from "../data/store.js";
import { useProductsStore } from "../data/store.js";
import { deleteProduct } from "../data/crud.js"
import penIcon from "../assets/solar_pen-bold.svg";

const Productcard = ({ product }) => {
    const cart = useCartStore((state) => state.cart);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const plusQuantity = useCartStore((state) => state.plusQuantity);
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const setProductList = useProductsStore((state) => state.setProductList);

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

    return (
        <div className="product-card" key={product.id}>
            <div className="img-container">
                {isAdmin ? <img src={penIcon} alt="Edit icon" className="edit-icon" /> : ""}
                <NavLink to={`/products/${product.id}`}>
                    <img src={product.img} />
                </NavLink>
            </div>
            <div className="product-info">
                <NavLink to={`/products/${product.id}`}>
                    <h4>{product.name}</h4>
                </NavLink>
                <h3 className="price">{product.price} SEK</h3>
                {!isAdmin ? (
                    <button onClick={handleAdd}>Lägg till</button>
                ) : (
                    <div>
                        <button onClick={() => deleteProduct(product.id, setProductList)}>Ta bort</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Productcard;
