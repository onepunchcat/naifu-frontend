import 'uno.css'
import '@unocss/reset/tailwind.css'
import './styles/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppProvider } from './components/provider'
import { Index } from './pages/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
)
