import { useCartStore } from "../data/store.js"
import "./cart.css"
import trashIcon from "../assets/tabler_trash-filled.svg"
const Cart = () => {

    const cart = useCartStore((state) => state.cart);
    const emptyCart = useCartStore((state) => state.emptyCart)
    const plusQuantity = useCartStore((state) => state.plusQuantity)
    const minusQuantity = useCartStore((state) => state.minusQuantity)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const handleSub = (id) => {
        minusQuantity(id)
    }
    const handlePlus = (id) => {
        plusQuantity(id)
    }
    const handleDelete = (id) => {
        removeFromCart(id)
    }


    return (
        <div className="cart">
            <div className="cart-container">
                <h2>Varukorg</h2>
                {cart.map(item => <div key={item.id} className="cart-item">
                    <div className="name-price">
                        <h3>{item.name}</h3>
                        <p className="price">{item.price * item.quantity} SEK</p>
                    </div>
                    <div className="price-trash">
                        <div className="quantity-buttons">
                            <button onClick={() => handleSub(item.id)}>-</button>
                            <p>{item.quantity}</p>
                            <button onClick={() => handlePlus(item.id)}>+</button>
                        </div>
                        <button className="trash-button"
                            onClick={() => handleDelete(item.id)} >
                            <img src={trashIcon} alt="trash can" />
                        </button>
                    </div>
                </div>
                )
                }
                <div>
                    <div className="total-container">
                        <h2>TOTALT:</h2>
                        <h2 className="total"> {cart.reduce((total, item) => total + (item.price * item.quantity), 0)} SEK</h2>
                    </div>

                    <button className="buy-button" onClick={() => emptyCart()}>BETALA</button>
                </div>
            </div >
        </div >
    );
};

export default Cart;