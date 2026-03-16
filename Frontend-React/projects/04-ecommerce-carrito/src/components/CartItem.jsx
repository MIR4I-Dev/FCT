import { useCart } from "../hooks/useCart.jsx";

export function CartItem({ product }) {
    const { removeFromCart, addToCart } = useCart()
    const handleAddToCart = () => {
        addToCart(product)
    }
    const handleRemoveFromCart = () => {
        removeFromCart(product)
    }
    return (
        <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
                <strong>{product.title}</strong>
                <span>${product.price}</span>
            </div>
            <footer>
                <small>Qty: {product.quantity}</small>
                <button onClick={handleAddToCart} aria-label="Añadir al carrito">+</button>
                <button onClick={handleRemoveFromCart} aria-label="Eliminar del carrito">-</button>
            </footer>
        </li>
    )
}