import { createContext, useReducer } from "react";
import { cartReducer, initialState } from "../reducers/cart.jsx";

export const CartContext = createContext(initialState)

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addToCart = (movie) => {
        dispatch({ type: 'ADD_TO_CART', payload: movie })
    }

    const removeFromCart = (movie) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: movie })
    }

    const inCart = (movie) => {
        return state.some(item => item.id === movie.id)
    }

    return (
        <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, inCart }}>
            {children}
        </CartContext.Provider>
    )
}