import { Products } from "./components/Products.jsx"
import { useState } from "react"
import { products as initialProducts } from "./mocks/products.json"
import { Header } from "./components/Header.jsx"
import { useFilters } from "./hooks/useFilters.jsx"
import { Footer } from "./components/Footer.jsx"
import { Cart } from "./components/Cart.jsx"
import { CartProvider } from "../context/cart.jsx";


export function App() {
  const [products] = useState(initialProducts)
  const { filterProducts, filters, setFilters } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer filters={filters} setFilters={setFilters} />
    </CartProvider>
  )
}
