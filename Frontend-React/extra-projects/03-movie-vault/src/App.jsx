import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Vault } from './components/Vault.jsx'
import { Home } from './components/Home.jsx'
import { DetailedMovie } from './components/DetailedMovie.jsx'

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/vault',
      element: <Vault />
    },
    {
      path: '/movie/:id',
      element: <DetailedMovie />
    },
    {
      path: '*',
      element: <h1>404 - Not Found</h1>,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}
