import { createRoot } from 'react-dom/client'
import './assets/css/output.css'
import { App } from './App.jsx'
import { FiltersProvider } from './context/filters.jsx'
import { CartProvider } from './context/cart.jsx'

createRoot(document.getElementById('root')).render(
    <FiltersProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </FiltersProvider>
)
