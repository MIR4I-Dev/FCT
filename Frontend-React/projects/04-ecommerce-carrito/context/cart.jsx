import { useReducer, createContext } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cart.js'

// 1. Crear el contexto
export const CartContext = createContext()

// 2. Crear el hook para consumir el contexto
function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    return { state, addToCart, removeFromCart, clearCart } // state representa el carrito una vez reducido y los otros 3 son las funciones que modifican el carrito, asi debe usarse el reducer
}

// 3. Crear el componente que va a envolver a todos los componentes que necesiten acceder al contexto y pasamos los valores del contexto
export function CartProvider({ children }) {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}