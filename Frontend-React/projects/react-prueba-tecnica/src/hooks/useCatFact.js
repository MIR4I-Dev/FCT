import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export const useCatFact = () => {
    const [fact, setFact] = useState()
    const getRandomFactAndUpdateState = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }
    useEffect(() => { getRandomFactAndUpdateState() }, [])
    return { fact, getRandomFactAndUpdateState }
}