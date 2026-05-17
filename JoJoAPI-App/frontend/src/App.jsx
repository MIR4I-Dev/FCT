import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SubmissionForm } from './components/SubmissionForm.jsx'
import { Register } from './components/Register.jsx'
import { Login } from './components/Login.jsx'
import { Home } from './components/Home.jsx'
import { NotFound } from './components/NotFound.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/stands',
      element: <Home />
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/users/submission',
          element: <SubmissionForm />
        },
      ]
    },
    {
      path: '/users/register',
      element: <Register />
    },
    {
      path: '/users/login',
      element: <Login />
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}
