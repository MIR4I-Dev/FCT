import { useCart } from "../hooks/useCart.jsx";

export function CartItem({ product }) {
    const { removeFromCart, addToCart } = useCart()
    return (
        <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
                <strong>{product.title}</strong>
                <span>${product.price}</span>
            </div>
            <footer>
                <small>Qty: {product.quantity}</small>
                <button onClick={() => addToCart(product)}>+</button>
                <button onClick={() => removeFromCart(product)}>-</button>
            </footer>
        </li>
    )
}