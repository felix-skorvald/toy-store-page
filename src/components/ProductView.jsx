import { useAdminStore } from "../data/store";

const ProductView = ({ product }) => {

    const isAdmin = useAdminStore((state => state.isAdmin))
    return !isAdmin ? (
        <div>
            <img
                src={product.img}
                alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p> {product.price}:-</p>
            <button>
                Lägg till i varukorgen
            </button>
        </div>
    ) : (
        <div>
            <label htmlFor="name">Title</label>
            <input type="text" id="name" defaultValue={product.name} />

            <label htmlFor="img">Image URL</label>
            <input type="text" id="img" defaultValue={product.img} />

            <label htmlFor="description">Beskrivning</label>
            <input type="text" id="description" defaultValue={product.description} />

            <label htmlFor="price">Pris</label>
            <input type="text" id="price" defaultValue={product.price} />
        </div>
    );
};

export default ProductView;