export const initialState = JSON.parse(localStorage.getItem('cart')) || []

export const updateLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'ADD_TO_CART': {
            const productInCartIndex = state.findIndex(item => item.id === payload.id)

            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)

                updateLocalStorage(newState)
                return newState
            }

            const newState = structuredClone(state)
            newState.push({ ...payload })
            updateLocalStorage(newState)
            return newState
        }

        case 'REMOVE_FROM_CART': {
            const newState = state.filter(item => item.id !== payload.id)
            updateLocalStorage(newState)
            return newState
        }

        default:
            return state
    }
}