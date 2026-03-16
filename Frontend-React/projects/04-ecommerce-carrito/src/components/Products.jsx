import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.jsx'

export function Products({ products }) {
    const { addToCart, cart, removeFromCart } = useCart()

    return (
        <main className="products">
            <ul>
                {products.map(product => {
                    const handleClick = () => {
                        (isProductInCart) ? removeFromCart(product) : addToCart(product)
                    }

                    const isProductInCart = cart.some(item => item.id === product.id)
                    return (
                        <li key={product.id}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <div>
                                <strong>{product.title}</strong> - {product.price}€
                            </div>
                            <div>
                                <button style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                                    onClick={handleClick}
                                    aria-label={isProductInCart ? 'Eliminar del carrito' : 'Añadir al carrito'}>
                                    {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                                </button>
                            </div>
                        </li>
                    )
                }
                )}
            </ul>
        </main>
    )
}