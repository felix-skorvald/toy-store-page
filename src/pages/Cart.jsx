import { useCartStore } from "../data/store.js"
import "./cart.css"
const Cart = () => {

    const cart = useCartStore((state) => state.cart);
    const emptyCart = useCartStore((state) => state.emptyCart)
    return (
        <div className="cart">
            <div className="cart-container">
                <h2>Varukorg</h2>
                {cart.map(item => <div key={item.id} className="cart-item">
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.quantity} st</p>
                    </div>
                    <p>{item.price * item.quantity} SEK</p>
                </div>
                )}
                <div>
                    <h2>TOTALT: {cart.reduce((total, item) => total + (item.price * item.quantity), 0)} SEK</h2>
                    <button onClick={() => emptyCart()}>BETALA</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;