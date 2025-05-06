const Productcard = ({product})=><div className="product-card" key={product.id}>
<p>{product.name}</p>
<p>{product.description}</p>
<p></p>
<p>{product.img}</p>
</div>

export default Productcard;