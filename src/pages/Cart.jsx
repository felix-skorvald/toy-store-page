import { useCartStore } from "../data/store.js"

const Cart = () => {

    const cart = useCartStore((state) => state.cart);
    return (
        <div>
            {cart.map(item => <div key={item.id}>
                <div>
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                </div>
                <p>{item.price * item.quantity}</p>
            </div>
            )}
        </div>
    );
};

export default Cart;