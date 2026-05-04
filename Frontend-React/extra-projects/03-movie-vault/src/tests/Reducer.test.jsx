import { describe, it, expect } from 'vitest'
import { cartReducer } from '../reducers/cart.jsx'

describe('cartReducer', () => {
    it('should add a movie to the cart', () => {
        const initialState = []
        const movieToAdd = { id: 1, title: 'Inception', year: 2010 }
        const action = { type: 'ADD_TO_CART', payload: movieToAdd }
        
        const newState = cartReducer(initialState, action)
        
        expect(newState).toHaveLength(1)
        expect(newState[0].title).toBe('Inception')
    })

    it('should remove a movie from the cart', () => {
        const initialState = [{ id: 1, title: 'Inception', year: 2010 }]
        const movieToRemove = { id: 1 }
        const action = { type: 'REMOVE_FROM_CART', payload: movieToRemove }
        
        const newState = cartReducer(initialState, action)
        
        expect(newState).toHaveLength(0)
    })
})