import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export const useCatFact = () => {
    const [fact, setFact] = useState()
    const [error, setError] = useState(null)
    const getRandomFactAndUpdateState = () => {
        getRandomFact().then(newFact => setFact(newFact)).catch(err => {
            setError(err.message)
        })
    }
    useEffect(() => { getRandomFactAndUpdateState() }, [])
    return { fact, getRandomFactAndUpdateState, error }
}