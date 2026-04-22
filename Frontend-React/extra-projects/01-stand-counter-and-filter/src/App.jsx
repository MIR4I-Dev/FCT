import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { BlackOverlay } from './components/BlackOverlay.jsx'
import { CardSection } from './components/CardSection.jsx'
import { Footer } from './components/Footer.jsx'
import STANDS_DATA from './mocks/stands.json'

function App() {
  const stands = STANDS_DATA
  const [partFilter, setPartFilter] = useState('all');

  const handleClick = (part) => {
    setPartFilter(part);
  }

  const filteredStands = stands.filter((stand) => {
    return (partFilter === 'all') ? true : stand.part === parseInt(partFilter);
  });

  return (
    <>
      <BlackOverlay />
      <main className="relative z-10 w-full h-full max-h-full flex flex-col items-center overflow-x-hidden">
        <Header handleClick={handleClick} />
        <CardSection STANDS_DATA={filteredStands} />
        <Footer filter={partFilter} handleClick={handleClick} />
      </main>
    </>
  )
}

export default App
