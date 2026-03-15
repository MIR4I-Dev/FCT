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
            <label htmlFor={cartCheckboxId} className="cart-button">
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} className="cart-switch" hidden />
            <aside className="cart">
                <ul>
                    {cart.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </ul>
                <button onClick={() => clearCart()}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}