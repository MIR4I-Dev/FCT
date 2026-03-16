import { CartIcon, ClearCartIcon } from "./Icons.jsx";
import { useId } from "react";
import './Cart.css'
import { useCart } from "../hooks/useCart.jsx";
import { CartItem } from "./CartItem.jsx";

export function Cart() {
    const cartCheckboxId = useId()
    const { cart, clearCart } = useCart()
    return (
        <>
            <label htmlFor={cartCheckboxId} className="cart-button" aria-label="Carrito">
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} className="cart-switch" hidden />
            <aside className="cart" aria-label="Carrito">
                <ul>
                    {cart.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </ul>
                <button onClick={() => clearCart()} aria-label="Vaciar carrito">
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}