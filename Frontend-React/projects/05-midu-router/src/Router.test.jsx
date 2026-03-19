import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router } from './components/Router.jsx'
import { Route } from './components/Route.jsx'
import { Link } from './components/Link.jsx'
import { getCurrentPath } from './utils/getCurrentPath.js'

// Mock (simulación) de getCurrentPath para poder controlar la ruta actual en los tests
vi.mock('./utils/getCurrentPath.js', () => ({
  getCurrentPath: vi.fn() // vi.fn() crea una función mock que permite rastrear las llamadas y los argumentos que se le pasan
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup() // Limpia el DOM después de cada test
    vi.clearAllMocks() // Limpia todas las llamadas a las funciones mock
  })

  it('should render without problems', () => {
    render(<Router routes={[]} />) // Renderiza el Router sin rutas
    expect(true).toBeTruthy() // Verifica que el Router se renderice sin problemas
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />) // Renderiza el Router con rutas vacías y un componente 404
    expect(screen.getByText('404')).toBeTruthy() // Verifica que el componente 404 se renderice
  })

  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about') // Establece la ruta actual como '/about'

    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />) // Renderiza el Router con las rutas
    expect(screen.getByText('About')).toBeTruthy() // Verifica que el componente About se renderice
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/') // Establece la ruta actual como '/'

    render(
      <Router>
        <Route
          path='/' Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go to About</Link>
              </>
            )
          }}
        />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Router>
    )

    // Click on the link
    const anchor = screen.getByText(/Go to About/)
    fireEvent.click(anchor)

    const aboutTitle = await screen.findByText('About')

    // Check that the new route is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
