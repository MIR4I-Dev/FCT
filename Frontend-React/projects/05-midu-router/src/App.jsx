import { lazy, Suspense } from 'react'
// Lazy loading para mejorar el rendimiento y solo cargar los componentes cuando se necesitan
// Suspense es un componente de React que permite mostrar un fallback mientras se cargan los componentes

import Page404 from './pages/404.jsx'
import SearchPage from './pages/Search.jsx'

import { Router } from './components/Router.jsx'
import { Route } from './components/Route.jsx'

// Debe hacerse una exportación por defecto para importar en el lazy loading
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

// Definimos las rutas de la aplicación, con argumentos dinámicos
// :lang y :query son argumentos dinámicos
const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={null}> {/* Fallback que se muestra mientras se cargan los componentes, en este caso nada */}
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
