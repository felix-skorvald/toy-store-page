import { useCartStore } from "../data/store.js"


const Productcard = ({ product }) => {
    const cart = useCartStore((state) => state.cart);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const plusQuantity = useCartStore((state) => state.plusQuantity);



    const handleAdd = () => {

        let cartItem = { id: product.id, name: product.name, quantity: 1, price: product.price }
        if (cart) {
            const foundItem = cart.find(item => item.id == product.id)
            if (foundItem) {
                plusQuantity(product.id)

                return;
            }
        }

        addCartItem(cartItem)
    }


    return (
        <div className="product-card" key={product.id}>
            <div className="img-container">
                <img src={product.img} />
            </div>
            <div className="product-info">
                <h4>{product.name}</h4>
                <h3>{product.price} SEK</h3>
                <button onClick={handleAdd}>Lägg till</button>
            </div>
        </div>
    )
};

export default Productcard;
