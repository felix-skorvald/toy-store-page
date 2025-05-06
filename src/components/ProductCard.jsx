import "./productCard.css";

const Productcard = ({ product }) => (
    <div className="product-card" key={product.id}>
        <div className="img-container">
            <img src={product.img} />
        </div>
        <div className="product-info">
            <h4>{product.name}</h4>
            <h3>{product.price} SEK</h3>
        </div>
    </div>
);

export default Productcard;
