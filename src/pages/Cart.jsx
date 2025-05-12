import { useCartStore } from "../data/store.js"
import "./cart.css"
const Cart = () => {

    const cart = useCartStore((state) => state.cart);
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
                    <h2>totalt:9999</h2>
                    <button>Betala</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;