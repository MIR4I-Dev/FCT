export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        const { id } = action.payload
        const productInCartIndex = state.findIndex(item => item.id === id)

        if (productInCartIndex >= 0) {
            // 👀 una forma sería usando structuredClone
            // const newState = structuredClone(state)
            // newState[productInCartIndex].quantity += 1

            // 👶 usando el map
            // const newState = state.map(item => {
            //   if (item.id === id) {
            //     return {
            //       ...item,
            //       quantity: item.quantity + 1
            //     }
            //   }

            //   return item
            // })

            // ⚡ usando el spread operator y slice
            const newState = [
                ...state.slice(0, productInCartIndex), // 1. Copia todo lo que hay ANTES del producto
                { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 }, // 2. Copia el producto y cámbiale la cantidad. 
                ...state.slice(productInCartIndex + 1) // 3. Copia todo lo que hay DESPUÉS del producto
            ]

            updateLocalStorage(newState)
            return newState
        }

        // Si no está en el carrito, lo agregamos con cantidad 1
        const newState = [
            ...state, // Copia todo lo que hay en el carrito
            {
                ...action.payload, // Copia el producto
                quantity: 1 // Le asigna cantidad 1
            }
        ]

        updateLocalStorage(newState)
        return newState
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
        const { id } = action.payload
        const productInCartIndex = state.findIndex(item => item.id === id)

        if (productInCartIndex >= 0) {
            const item = state[productInCartIndex]
            let newState

            // Si solo hay uno, lo eliminamos directamente
            if (item.quantity <= 1) {
                newState = state.filter(item => item.id !== id)
            } else {
                // Si hay más de uno, restamos
                newState = state.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            }

            updateLocalStorage(newState)
            return newState
        }
        return state
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
        updateLocalStorage([])
        return []
    }
}

export const cartReducer = (state, action) => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action) : state
}